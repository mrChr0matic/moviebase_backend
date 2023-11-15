const movieRouter=require('express').Router();
const {addMovie,fetchMovie,deleteMovie,updateMovie}=require("../controllers/movieController");


movieRouter.route('/')
    .post(addMovie)
    .get(fetchMovie)
    .delete(deleteMovie)
    .put(updateMovie)
                    

module.exports=movieRouter;