const jwt = require('jsonwebtoken');

exports.verify = (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) //return res.status(401).send('Access Denied!!');
        console.log('Token Expired Bro');
    try{
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user= verified;
        next();
    }catch(err){
        //res.status(400).send('Invalid Token');
        console.log('Invalid Token');
    }


    

}