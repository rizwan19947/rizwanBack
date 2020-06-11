const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    fname:{
        type: String,
        required: true,
        min:3
    },
    lname: {
        type: String,
        required: true,
        min:3
    },
    email: {
        type:String,
        required:true,
        max: 255,
        min:6
    },
    password: {
        type: String,
        required: true,
        min: 8
    },
    role :{
        type: Number,
        default: 0
    }
},
{timestamps:true
});

module.exports = mongoose.model('User', UserSchema);