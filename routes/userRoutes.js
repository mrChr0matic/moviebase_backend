const userRouter=require('express').Router();
const { addHistory, viewHistory, deleteHistory } = require('../controllers/historyController');
const {userRegister,userLogin}=require('../controllers/userController');
const { addToWatchlist, deleteFromWatchlist, getWatchList } = require('../controllers/watchlistController');
const authorize = require('../middleware/auth');

userRouter.route('/register').post(userRegister);
userRouter.route('/login').post(userLogin);

userRouter.use(authorize);
userRouter.route('/watchlist')
    .post(addToWatchlist)
    .delete(deleteFromWatchlist)
    .get(getWatchList)

userRouter.route('/history')
    .post(addHistory)
    .get(viewHistory)
    .delete(deleteHistory)
    
module.exports=userRouter;