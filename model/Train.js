let mongoose = require('mongoose');
let Schema = mongoose.Schema;
const {ObjectId} = mongoose.Schema;

let trainSchema = new Schema({

    trainNo: {
        type: String,
        required: true
    },
    station: {
        type: String,
        required: true,
    },
    TrainName:{
        type: String,
        required: true,
    },
    departureDate: {
        type: Date,
        required: true
    },
    arrivalDate: {
        type: Date,
        required: true
    },
    departureTime: {
        type: String,
        required: true
    },
    arrivalTime: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    origin: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    classes: {
        type: String,
        required:true
    },
    noOfSeats:{
        type: Number,
        required:true
    },
    price:{
        type: Number,
        required:true
    }
});

let Train = mongoose.model('train', trainSchema);

module.exports = Train;
