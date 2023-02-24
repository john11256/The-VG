const {Router} = require('express')
const {getGenre} = require('../Controllers/GenreController');
const {Genre} = require('../db');

const router = Router();

router.get('/', async (req, res) => {
    const genre = await getGenre();
    try {
        genre.forEach((ev) =>{
            Genre.findOrCreate({
                where: { name: ev }   
            })
        });
        const allGenres = await Genre.findAll();
        res.status(200).send(allGenres);
    } catch (error) {
        res.status(404).send({error: error.message})
    }
})

module.exports = router;