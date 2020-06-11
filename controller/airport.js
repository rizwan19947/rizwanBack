const Airport = require('../model/Airport');

exports.newairport = async(req, res) => {
    const airport =new Airport({
        AirportID: req.body.AirportID,
        AirportName: req.body.AirportName
    });
    try{
        const savedairport = await airport.save(airport);
        res.send({ airport: airport._id });
    }catch(err){
        res.status(400).send('Error Occurred : '+err);
    }
}

exports.allairports = async (req,res)=>{
    const allairports = await Airport.find();
    res.json(allairports);
}