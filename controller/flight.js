const Flight = require('../model/Flight');
const fs = require('fs');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null,'./uploads/' );
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});
const uploads = multer({storage:storage});

exports.newflight =  async(req,res) =>{
    const flight = new Flight({
        flightNo: req.body.flightNo,
        AirportId: req.body.AirportId,
        departureDate: req.body.departureDate,
        arrivalDate: req.body.arrivalDate,
        departureTime: req.body.departureTime,
        arrivalTime: req.body.arrivalTime,
        duration: req.body.duration,
        origin: req.body.origin,
        destination: req.body.destination,
        classes: req.body.classes,
        noOfSeats: req.body.noOfSeats,
        price: req.body.price
    });
    if(req.file){
        flight.Airline.data =fs.readFileSync(req.file.path);
        flight.Airline.contentType = req.file.type;
    }
    try{
        const savedflights = await flight.save(flight);
        res.send({flight: flight._id});
    }catch(err){
        res.status(400).send(err);
    }
}

exports.allflights = async (req,res)=>{
    const allflights= await Flight.find();
    res.json(allflights);
}

exports.deleteflights =async (req,res)=>{
    const removedPost = await Flight.remove({_id: req.params.postId }) 
    res.json(removedPost);
}

