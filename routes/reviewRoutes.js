const reviewRouter=require('express').Router();
const { addReview } = require('../controllers/reviewController');
const authorize = require('../middleware/auth');


reviewRouter.use(authorize);
reviewRouter.route('/').post(addReview);

module.exports =reviewRouter;