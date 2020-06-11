const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mysql = require('mysql');
const cookieParser = require('cookie-parser');
const cors = require("cors");
//const con = require('./controller/sql');
//const bodyParser = require("body-parser");
//const logger = require("morgan");


dotenv.config();

//Import Routes
const authRoute =require('./routes/auth');
const airportRoute =require('./routes/airport');
const flightRoute =require('./routes/flight');
const trainRoute =require('./routes/train');
const busRoute =require('./routes/bus');
const userRoute = require('./routes/user');


//Connect to DB
/*
mongoose.connect(process.env.DB_CONNECT,
    { useNewUrlParser: true,
      useUnifiedTopology: true },
    ()=> console.log('Connected to DB')
    );
*/
    
 var con = mysql.createConnection(
    {
        host: "webapp-akays.ctuennwch00f.ap-southeast-1.rds.amazonaws.com",
        user : "admin",
        password: "noorrizwanammar",
        database : "web_app",
        port : 4000
    });

    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
      });   


//Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors());




//Routes Middlewares
app.use('/api/user', authRoute);
app.use('/api/airport', airportRoute);
app.use('/api/flight', flightRoute);
app.use('/api/train', trainRoute);
app.use('/api/bus', busRoute);
app.use('/api/use', userRoute);


app.listen(4000, () => console.log('Server up and Running'));