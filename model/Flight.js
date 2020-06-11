let mongoose = require('mongoose');
let Schema = mongoose.Schema;
const {ObjectId} = mongoose.Schema;

let flightSchema = new Schema({

    flightNo: {
        type: String,
        required: true
    },
    AirportId: {
        type: ObjectId,
        ref: 'Airport'
    },
    Airline:{
        data: Buffer,
        contentType: String
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

let Flight = mongoose.model('flight', flightSchema);

module.exports = Flight;
