const userRouter=require('express').Router();
const {userRegister,userLogin}=require('../controllers/userController');


userRouter.route('/register').post(userRegister);
userRouter.route('/login').get(userLogin);


module.exports=userRouter;