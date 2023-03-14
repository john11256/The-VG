const axios = require('axios');
const { Videogame, Genre, Platform } = require('../db');
const { API_KEY } = process.env;

const getApiInfo = async () => {
    const url1 = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=1`, { headers: { "accept-encoding": "*", }, });
    const url2 = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=2`, { headers: { "accept-encoding": "*", }, });
    const url3 = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=3`, { headers: { "accept-encoding": "*", }, });
    const url4 = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=4`, { headers: { "accept-encoding": "*", }, });
    const url5 = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=5`, { headers: { "accept-encoding": "*", }, });
    const url6 = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=6`, { headers: { "accept-encoding": "*", }, });

    const url = [...url1.data.results, ...url2.data.results, ...url3.data.results, ...url4.data.results, ...url5.data.results, ...url6.data.results]

    const info = await url.map((ev) => {
        return {
            name: ev.name,
            released: ev.released,
            rating: ev.rating,
            platforms2: ev.platforms.map((ev) => ev.platform.name),
            genres2: ev.genres.map((ev) => ev.name),
            image: ev.background_image,
        };
    });
    const DB = await Videogame.bulkCreate(info)
    return DB;
};

// Para traer la nformcion de la DB
const getDBInfo = async () => {
    const gameDB = await Videogame.findAll({   // trae todos lo VG
        include: [
            {
                model: Genre,
                attributes: ['name'],
                through: {
                    attributes: []
                }
            },
            {
                model: Platform,
                attributes: ['name'],
                through: {
                    attributes: []
                }
            }
        ]
    })
    return gameDB
};


// Para unir las dos informaciones 
//const getAllInfo = async () => {
    // const apiinfo = await getApiInfo();
    //const dbinfo = await getDBInfo();
    // const allinfo = [...apiinfo, ...dbinfo];
    //return dbinfo;
//};

module.exports = {
    getDBInfo,
    getApiInfo
}
