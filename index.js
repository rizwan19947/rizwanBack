const express = require('express');
const app = express();
const dotenv = require('dotenv');
//const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

dotenv.config();

//Import Routes
const authRoute =require('./routes/auth');
const airportRoute =require('./routes/airport');
const flightRoute =require('./routes/flight');
const trainRoute =require('./routes/train');
const userRoute = require('./routes/user');


//Connect to DB
/*mongoose.connect(process.env.DB_CONNECT,
{ useNewUrlParser: true,
  useUnifiedTopology: true },
()=> console.log('Connected to DB')
);*/



//Middleware
app.use(express.json());
app.use(cookieParser());


//Routes Middlewares
app.use('/api/user', authRoute);
app.use('/api/airport', airportRoute);
app.use('/api/flight', flightRoute);
app.use('/api/train', trainRoute);
app.use('/api/use', userRoute);


app.listen(3000, () => console.log('Server up and Running'));