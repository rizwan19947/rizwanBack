
const con = require('./sql');




exports.allflights = async (req, res) => {
    console.log("chal rha hai.");
    const allflights =
        con.query("SELECT * FROM Flight", (err, row, fields) => {

            if (!err) {
                res.send(row)
            } else {
                console.log(err)
            }
        });
    res.json(allflights);

}

exports.searchflights = async (req, res) => {
    alert("SearchFlights works!");
    const destination = req.body.destination;
    const origin = req.body.origin
    const val = [origin, destination];
    const myquery = "Select * FROM Flight WHERE origin = " + 'origin' + " AND destination = " +'destination'+ "";
    con.query("Select * FROM Flight WHERE origin = " + 'origin' + " AND destination = " +'destination'+ "", val, (err, row, fields) => {

        if (!err) {
            res.send(row)
        } else {
            console.log(err)
        }
    });
    //res.json(allflights);

}



exports.newflight = async (req, res) => {
    console.log(JSON.stringify(req.body) + "FLIGHT ADDINGGGG");

    const newt = ("INSERT INTO Flight (flightNo, AirportId, Airline, departureDate, arrivalDate, departureTime, arrivalTime, duration, origin, destination, classes, noOfSeats, price) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)");
    var values = [req.body.flightNo, req.body.AirportId, req.body.Airline, req.body.departureDate, req.body.arrivalDate, req.body.departureTime, req.body.arrivalTime, req.body.duration, req.body.origin, req.body.destination, req.body.classes, req.body.noOfSeats, req.body.price];
    con.query(newt, values, (err, row, fields) => {
        if (!err) {
            console.log(row)
        } else {
            console.log(err)
        }
    });
}


exports.deleteflights = async (req, res) => {

    const flightid = req.body.flightid;
    const newsql = "DELETE FROM Flight WHERE flightid = '" + flightid + "' ";
    console.log(newsql);
    con.query(newsql, (err, row, fields) => {
        if (!err) {
            console.log(row)
        } else {
            console.log(err)
        }
    });
}

/*


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

*/