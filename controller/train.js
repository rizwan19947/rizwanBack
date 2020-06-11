const mysql = require('mysql');

const Bus = require('../model/Bus');

const con = require('./sql');




exports.alltrains = async (req, res) => {
    const alltrains =
        con.query("SELECT * FROM Train", (err, row, fields) => {

            if (!err) {
                res.send(row)
            } else {
                console.log(err)
            }
        });
    res.json(alltrains);

}

exports.newtrain = async(req, res) =>{
    console.log(JSON.stringify(req.body)+"PLSSS");
    
    const newt = ("INSERT INTO Train (trainNo, station, TrainName, departureDate, arrivalDate, departureTime, arrivalTime, duration, origin, destination, classes, noOfSeats, price) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)");
    var values= [req.body.trainNo, req.body.station, req.body.TrainName, req.body.departureDate, req.body.arrivalDate, req.body.departureTime, req.body.arrivalTime, req.body.duration, req.body.origin, req.body.destination, req.body.classes, req.body.noOfSeats, req.body.price];
    con.query(newt, values, (err, row, fields) => {
        if (!err) {
            console.log(row)
        } else {
            console.log(err)
            }
         } );
}




/*
const Train = require('../model/Train');

exports.newtrain =  async(req,res) =>{
    const train = new Train({
        trainNo: req.body.trainNo,
        station: req.body.Station,
        TrainName: req.body.TrainName,
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
    try{
        const savedtrains = await train.save(train);
        res.send({train: train._id});
    }catch(err){
        res.status(400).send(err);
    }
}

exports.alltrains = async (req,res)=>{
    const alltrains= await Train.find();
    res.json(alltrains);
}

exports.deletetrains =async (req,res)=>{
    const removedPost = await Train.remove({_id: req.params.postId }) 
    res.json(removedPost);
}

*/