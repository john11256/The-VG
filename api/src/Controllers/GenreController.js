const axios = require('axios');

const {API_KEY} = process.env;

const getGenre = async () => {
    const url = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`, { headers: {"accept-encoding": "*",},});
    const genre = await url.data.results.map((ev) => {return ev.name});
    return genre;
}

module.exports = {getGenre} 