const router=require('express').Router();
const {userRegister,userLogin}=require('../controllers/userController');
const {adminRegister}=require('../controllers/adminController');
const {addMovie,fetchMovie,deleteMovie}=require("../controllers/movieController");

router.route('/adminReg').post(adminRegister);

router.route('/userReg').post(userRegister);
router.route('/userLogin').get(userLogin);

router.route('/movieAdd').post(addMovie);
router.route('/searchMovie').get(fetchMovie);
router.route('/movieDel').post(deleteMovie);

module.exports=router;