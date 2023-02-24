const {Router} = require('express')
const {getPlatform} = require('../Controllers/PlatformController');
const {Platform} = require('../db');

const router = Router();

router.get('/', async (req, res) => {
    const platform = await getPlatform();
    try {
        platform.forEach((ev) =>{
            ev.forEach((ev) => {
                Platform.findOrCreate({
                    where: { name: ev }   
                })
            })
        });
        const allPlatforms = await Platform.findAll();
        res.status(200).send(allPlatforms);
    } catch (error) {
        res.status(404).send({error: error.message})
    }
})

module.exports = router;