const router = require('express').Router();
const {requireSignin} = require('../controller/auth');
const {newtrain,alltrains,deletetrains}= require('../controller/train');
const Train = require('../model/Train');
const {userById} = require('../controller/user');

router.post('/newtrain', newtrain);
router.get('/gettrains', alltrains);
router.delete('/:postId', deletetrains);
router.param('userId', userById);

module.exports = router;