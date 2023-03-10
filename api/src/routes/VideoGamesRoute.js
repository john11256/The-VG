const {Router} = require('express');
const {getAllInfo} = require('../Controllers/VideoGamesCotroller');
const {Videogame, Genre, Platform} = require('../db');
const { API_KEY } = process.env;
const axios = require('axios');

const router = Router();


router.get('/', async (req,res) => {
    const {name} = req.query;
    const VideoGames = await getAllInfo();
    try {
        if(name){
            const nameVG = await VideoGames.filter((ev) => ev.name.toLowerCase().includes(name.toLowerCase()));
            nameVG.length?
            res.status(200).send(nameVG):
            res.status(400).send(`The id ${name} not found`);
        }else{
            res.status(200).send(VideoGames);
        }
    } catch (error) {
        res.status(404).send({error: error.messge})
    }
})


router.get("/:id", async (req,res) => {
    const {id} = req.params;
    let VGTotal = await getAllInfo(); 
    let VGId = VGTotal.find((ev) => ev.id == id)
    try {
        if(!VGId) throw new Error (`The id ${id} not found`);
        res.status(200).send(VGId);
    } catch (error) {
        res.status(404).send(error.message);
    } 
});


router.post("/", async (req,res) => {
    let { name, image, released, description, rating, platforms, genres, createdInDB } = req.body;  // Todo lo que se pide e ingresa por body
    try {
        let GameCreated = await Videogame.create({ name, image, released, description, rating, createdInDB});  // Se crea el game con estas porpiedades que recibe por body menos el genre
        if(genres){
            genres.map(async (genre) => {
                const genreFound = await Genre.findOne({
                    where : {
                        name: genre
                    }
                })
                GameCreated.addGenre(genreFound)
            })
        };
        if(platforms){
            platforms.map(async (platform) => {
                const platformFound = await Platform.findOne({
                    where : {
                        name: platform
                    }
                })
                GameCreated.addPlatform(platformFound)
            })
        }
        res.status(200).send(GameCreated);
    } catch (error) {
        res.status(404).send(error.message);
    };
});

router.put("/:id",async (req,res) => {
    const id = req.params.id;
    const arr = req.body.rating
    const rating =arr.reduce((a,b)=> a+b)/arr.length;
    console.log(arr);
    console.log(rating);
    let VGTotal = await getAllInfo();
    let VGId = VGTotal.find((ev) => ev.id == id);
    try {
        VGId.rating=rating
        res.status(200).send(VGId);
    } catch (error) {
        res.status(404).send(error.message);
    } 
})

module.exports = router;