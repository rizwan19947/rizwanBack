const router = require('express').Router();

const {userById} = require('../controller/user');
const {requireSignin, isAuth, isAdmin} = require('../controller/auth');

router.param('userId', userById);

router.get('/secret/:userId', requireSignin, isAuth, isAdmin, (req,res)=>{
    res.json({
        user: req.profile
    });
});

module.exports = router;