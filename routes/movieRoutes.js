const movieRouter=require('express').Router();
const {addMovie,fetchMovie,deleteMovie,updateMovie,getMovie}=require("../controllers/movieController");


movieRouter.route('/')
    .post(addMovie)
    .delete(deleteMovie)
    .put(updateMovie)

movieRouter.route('/find')
    .post(fetchMovie)

movieRouter.route('/find/:ISAN')
    .get(getMovie)
                    

module.exports=movieRouter;