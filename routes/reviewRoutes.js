const reviewRouter=require('express').Router();
const { addReview } = require('../controllers/reviewController');

reviewRouter.route('/').post(addReview);

module.exports =reviewRouter;