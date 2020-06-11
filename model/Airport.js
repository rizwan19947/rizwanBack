const mongoose = require('mongoose');

const AirportSchema = new mongoose.Schema({
    AirportID:{
        type: String,
        required: true,
        min:3
    },
    AirportName: {
        type: String,
        required: true,
    }
},
{timestamps:true
});

module.exports = mongoose.model('Airport', AirportSchema);