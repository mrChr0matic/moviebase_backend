const genreRouter=require('express').Router();
const { getGenreList } = require('../controllers/genreController');
const authorize = require('../middleware/auth')

genreRouter.route('/').post(getGenreList);

module.exports = genreRouter;