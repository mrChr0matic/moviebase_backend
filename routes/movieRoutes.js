const movieRouter=require('express').Router();
const { addCast, searchByCast } = require('../controllers/castController');
const {addMovie,fetchMovie,deleteMovie,updateMovie,getMovie, getCustomMovie}=require("../controllers/movieController");
const authorize = require('../middleware/auth');

movieRouter.route('/find')
    .post(fetchMovie) 

movieRouter.route('/find/custom').post(getCustomMovie);  

movieRouter.route('/find/:ISAN')
    .get(getMovie)

movieRouter.use(authorize)
movieRouter.route('/')
    .post(addMovie)
    .delete(deleteMovie)
    .put(updateMovie)

movieRouter.route('/crew')
    .post(addCast)

movieRouter.route('/crew/find')
    .post(searchByCast);

module.exports=movieRouter;