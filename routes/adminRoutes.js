const adminRouter=require('express').Router();
const {adminRegister,adminLogin,verification}=require('../controllers/adminController');
const authorize = require('../middleware/auth')

adminRouter.route('/register').post(adminRegister);
adminRouter.route('/login').get(adminLogin);

adminRouter.use(authorize)
adminRouter.route('/verify').put(verification);

module.exports=adminRouter;