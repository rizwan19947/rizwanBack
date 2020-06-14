require('dotenv').config();
const { verify } = require('../routes/verifytoken');
const User = require('../model/User');
const { registerValidation, loginValidation } = require('../validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const expressjwt = require('express-jwt');
const con = require('./sql');
var cookieSession = require('cookie-session');
var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');
const bodypar = require("body-parser");
const passport = require("passport")
var session = require('express-session');
const cors = require("cors");
app.use(cors());
app.use(bodypar.json());













exports.allusers = async (req, res) => {
    const allusers = await User.find();
    res.json(allusers);
}



exports.signup = async (req, res) => {

    //User Validations
    /*    const { error } = registerValidation(req.body);
        if (error) return res.status(400).send(error.details[0].message);
    
        //Checking if email is already in used
        const emailExist = await User.findOne({ email: req.body.email });
        if (emailExist) return res.status(400).send('Email already exists');
    */    //Hashing the Password
 //   const salt = await bcrypt.genSalt(10);
 //   const hashedPassword = await bcrypt.hash(req.body.password, salt);
    //Create a New user
    const user = new User({
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        password: req.body.password

    });

    const newusr = ("INSERT INTO user (fname, lname, email, password) VALUES (?,?,?,?)");
    var values = [user.fname, user.lname, user.email, user.password];
    con.query(newusr, values, (err, row, fields) => {
        if (!err) {
            console.log(row)
        } else {
            console.log(err)
        }
    });

    // console.log("This is mongo connection " +mongoose.connection.readyState);
    //const savedUser = await user.save(user);
    /*   let sql = "INSERT INTO user SET ?";
        let query = connection.query(sql, user, (err, results) => {
            if (err) throw err;
            
        });
        res.redirect('/Home');
    
    
            res.send({ user: user._id });
    */

}






exports.signin = async (req, res) => {

    //User Validations
    /*
        const {error}= loginValidation(req.body); 
        if(error) return res.status(400).send(error.details[0].message);
    
        //Checking if user is in DB
        const user = await User.findOne({email: req.body.email});
        if(!user) return res.status(400).send('Email does not exists');
    
        //Password is Correct
        const validPassword = await bcrypt.compare(req.body.password,user.password);
        if(!validPassword) return res.status(400).send('Invalid Password');
    */

    //checking if user exists

    console.log(req.body + "BODYYYY");
    const email = req.body.email;
    const pwd = req.body.password;
    const myquery = `SELECT * FROM user where email = ? and password = ?`;
    var value = [email, pwd];
    con.query(myquery, value, async function (error, results, fields) {
        console.log(JSON.stringify(results).length + "RESULTSS");

        if (error) {
            res.send({
                "code": 400,
                "failed": "error ocurred"
            })
        } else {
            if (JSON.stringify(results).length > 5) {
                console.log("Logged in!");
                return "Accepted";
                res.send({
                    "code": 200,
                    "success": "login sucessfull"
                })
            }
            else {
                console.log("not able to sign in");
                return "Denied";
                res.send({
                    "code": 204,
                    "success": "Email and password does not match"
                })

            }
        }
    }
    );

    return result; 


    //Create and assign token
    //  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    //  res.cookie('Token', token);

    //  return res.json({ token, _id: user._id });
}







exports.signout = async (req, res) => {
    console.log('Inside logout');
    res.clearCookie('Token');
    res.send('Signout Successfull!');
}

exports.deleteuser = async (req, res) => {
    const removedPost = await User.remove({ _id: req.params.postId })
    res.json(removedPost);
}

exports.requireSignin = expressjwt({
    secret: process.env.TOKEN_SECRET,
    userProperty: "auth"
});

exports.isAuth = (req, res, next) => {
    let user = req.profile && req.auth && req.profile._id == req.auth._id;
    if (!user) {
        return res.status(403).json({
            error: 'User credentials did not match. Access Denied!!'
        });
    }
    next();
};

exports.isAdmin = (req, res, next) => {

    



    /*if (req.profile.role === 0) {
        res.status(403).json({
            error: 'Admin resource, Access Denied!!!'
        });
    }
    next();*/


}



