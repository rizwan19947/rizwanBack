const router = require('express').Router();
const {requireSignin} = require('../controller/auth');
const {newflight,allflights,deleteflights}= require('../controller/flight');
const Flight = require('../model/Flight');
const {userById} = require('../controller/user');
const fs = require('fs');
//const multer = require('multer');

/*
const storage = multer.diskStorage({
   destination: function(req, file, cb) {
        cb(null,'./uploads/' );
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});
const uploads = multer({storage:storage});
*/

//router.post('/newflight', requireSignin, uploads.single('Airline'), newflight);
router.get('/getflights', allflights);
//router.delete('/:postId', deleteflights);
//router.param('userId', userById);

module.exports = router;