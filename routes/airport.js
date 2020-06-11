const router = require('express').Router();
const {requireSignin, isAdmin, isAuth} = require('../controller/auth');
const {userById} = require('../controller/user');
const {newairport, allairports} = require('../controller/airport');

router.post('/addnew', requireSignin, isAdmin, isAuth, newairport);
router.get('/getall', allairports);

router.param('userId', userById);

module.exports = router;