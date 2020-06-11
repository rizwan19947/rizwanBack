const mysql = require('mysql');

const Bus = require('../model/Bus');

const con = require('./sql');




exports.allbus = async (req, res) => {
    console.log("chal rha hai.");
    const allbus =
        con.query("SELECT * FROM Bus", (err, row, fields) => {

            if (!err) {
                res.send(row)
            } else {
                console.log(err)
            }
        });
    res.json(allbus);

}

exports.newbus = async (req, res) => {
    console.log("add bhi ho jayga.");
    let temp = req.body;
    const sql = `Insert Into Bus (busNo, station, BusName, departureDate, arrivalDate, departureTime, arrivaltime, duration, origin, destination, classes, noOfSeats, price) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?`
    var val = [temp.busNo, temp.station, temp.BusName, temp.departureDate, temp.arrivalDate, temp.departureTime, temp.arrivaltime, temp.duration, temp.origin, temp.destination, temp.classes, temp.noOfSeats, temp.price]
    con.query(sql, val, (err, row, fields) => {
        if (!err) {
            console.log(row)
        } else {
            console.log(err)
        }
    });

}

/*


const Bus = require('../model/Bus');

exports.newbus =  async(req,res) =>{
    const bus = new Bus({
        busNo: req.body.busNo,
        station: req.body.station,
        BusName: req.body.BusName,
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
        const savedbus = await bus.save(bus);
        res.send({bus: bus._id});
    }catch(err){
        res.status(400).send(err);
    }
}

exports.allbus = async (req,res)=>{
    const allbus= await Bus.find();
    res.json(allbus);
}

exports.deletebus =async (req,res)=>{
    let bus= req.bus;
    bus.remove((err, deletedbus)=>{
        if(err){
            return res.status(400).json({
                 error: "Bus doesn't exist"
            });
        }
        res.json({
            message: "Bus deleted successfully!! Bus Info Below",
            deletedbus
        });
    })
}

exports.busById = (req,res, next, id)=>{
    Bus.findById(id).exec((err, bus)=>{
        if(err || !bus){
            return res.status(400).json({
                error: "Bus doesn't exist"
            });
        }
        req.bus = bus;
        next();
    });
};

exports.read = (req, res)=>{
    return res.json(req.bus);
}

*/