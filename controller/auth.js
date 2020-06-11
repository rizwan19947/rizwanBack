const User = require('../model/User');
const {registerValidation, loginValidation} = require('../validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const expressjwt = require('express-jwt');

exports.signup = async(req, res) => {
    //User Validations
    const {error}= registerValidation(req.body); 
    if(error) return res.status(400).send(error.details[0].message);
    
    //Checking if email is already in used
    const emailExist = await User.findOne({email: req.body.email});
    if(emailExist) return res.status(400).send('Email already exists');
    //Hashing the Password
    const salt =await bcrypt.genSalt(10);
    const hashedPassword= await bcrypt.hash(req.body.password, salt);
    //Create a New user
    const user =new User({
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        password: hashedPassword
        
    });
    try{
       // console.log("This is mongo connection " +mongoose.connection.readyState);
        const savedUser = await user.save(user);
        res.send({ user: user._id });
    }catch(err){
        res.status(400).send('Error Occurred : '+err);
    }
}

exports.signin = async (req, res) => {


    //User Validations
    const {error}= loginValidation(req.body); 
    if(error) return res.status(400).send(error.details[0].message);

    //Checking if user is in DB
    const user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send('Email does not exists');

    //Password is Correct
    const validPassword = await bcrypt.compare(req.body.password,user.password);
    if(!validPassword) return res.status(400).send('Invalid Password');

    //Create and assign token
    const token = jwt.sign({_id: user._id},process.env.TOKEN_SECRET);
    res.cookie('Token', token);

    return res.json({token, _id: user._id}); 
}

exports.signout = async(req, res)=>{
    console.log('Inside logout');
    res.clearCookie('Token');
    res.send('Signout Successfull!');
}

exports.allusers = async (req,res)=>{
    const allusers= await User.find();
    res.json(allusers);
}

exports.deleteuser = async (req,res)=>{
    const removedPost = await User.remove({_id: req.params.postId }) 
    res.json(removedPost);
}

exports.requireSignin = expressjwt({
    secret: process.env.TOKEN_SECRET,
    userProperty: "auth"
});

exports.isAuth = (req, res, next)=>{
    let user =req.profile && req.auth && req.profile._id == req.auth._id;
        if(!user){
            return res.status(403).json({
                error: 'User credentials did not match. Access Denied!!'
            });
        }
    next();
};

exports.isAdmin = (req, res, next)=>{
    if(req.profile.role === 0){
        res.status(403).json({
            error: 'Admin resource, Access Denied!!!'    
        });
    }
    next();
}