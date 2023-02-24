const axios = require('axios');
const {API_KEY} = process.env;

const getPlatform = async () => {
    const url = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=1`, { headers: {"accept-encoding": "*",},});
    let info = await url.data.results?.map((ev) => {
        return {
            platforms: ev.platforms.map((ev) => ev.platform.name),
        };
    });
    info = info.map((ev) => {return ev.platforms})
    return info;
 };

module.exports = {getPlatform} 