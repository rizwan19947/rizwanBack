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

