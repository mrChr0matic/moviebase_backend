const editorsRouter=require('express').Router();
const { addEditorsChoice, deleteEditorsChoice, getEditorsChoice } = require('../controllers/editorsChoiceController');
const authorize = require('../middleware/auth');

editorsRouter.route('/')
    .post(addEditorsChoice)
    .delete(deleteEditorsChoice)

editorsRouter.route('/find')
    .get(getEditorsChoice)

module.exports=editorsRouter;