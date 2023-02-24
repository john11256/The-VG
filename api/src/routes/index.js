const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const VideoGameRouter = require('./VideoGamesRoute');
const GenreRoute = require('./GenreRoute');
const PlatformRoute = require('./PlatformRoute');
const LoginRoute = require('./LoginRoute')


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/videogame', VideoGameRouter);
router.use('/genre', GenreRoute);
router.use('/platform',PlatformRoute)
router.use('/login',LoginRoute)

module.exports = router;
