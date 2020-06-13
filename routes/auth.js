const router = require('express').Router();
const { verify } = require('../routes/verifytoken');
const {signup, signin, signout, allusers, deleteuser} = require('../controller/auth');
const {requireSignin, isAdmin, isAuth} = require('../controller/auth');

router.post('/register', signup);

//LOGIN
router.post('/login', signin);

router.get('/logout', signout);

router.get('/getusers', requireSignin, isAdmin, isAuth, allusers);

router.delete('/:postId', requireSignin, isAdmin, isAuth, deleteuser);

//router.post('/', verify);

module.exports = router;