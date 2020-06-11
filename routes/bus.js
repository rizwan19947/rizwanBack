const router = require('express').Router();
const {requireSignin, isAdmin, isAuth} = require('../controller/auth');
const {newbus,allbus,deletebus,busById, read}= require('../controller/bus');
const Bus = require('../model/Bus');
const {userById} = require('../controller/user');

router.post('/newbus', newbus);
router.get('/getbus', allbus);
//router.delete('/:busId', requireSignin, isAdmin, isAuth, deletebus);
//router.get('/busbyId/:busId', read);


//router.param('userId', userById);
//router.param('busId', busById);

module.exports = router;