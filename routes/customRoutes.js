const router=require('express').Router();
const {userRegister,userLogin}=require('../controllers/userController');
const {adminRegister,adminLogin,verification}=require('../controllers/adminController');
const {addMovie,fetchMovie,deleteMovie,updateMovie}=require("../controllers/movieController");

router.route('/adminReg').post(adminRegister);
router.route('/adminLogin').get(adminLogin);
router.route('/verification').put(verification);


router.route('/userReg').post(userRegister);
router.route('/userLogin').get(userLogin);

router.route('/movieAdd').post(addMovie);
router.route('/searchMovie').get(fetchMovie);
router.route('/movieDel').post(deleteMovie);
router.route('/updateMovie').put(updateMovie);

module.exports=router;