const Joi= require('@hapi/joi');

//Register Validation
const registerValidation = (data)=>{
    const schema = Joi.object({
        fname: Joi.string().min(3).required(),
        lname: Joi.string().min(3).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(8).required(),
        signup: Joi.any()
    });
    return schema.validate(data);    
};


//Login Validation
const loginValidation = (data)=>{
    const schema = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(8).required()
    });
    return schema.validate(data);    
};
module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;