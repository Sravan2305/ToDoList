const express = require('express');
const app  =express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const todoRoutes = require('./Routes/todoRoutes');
let cors = require('cors')
app.use(cors())
app.use(bodyParser.json());



const URI = "mongodb+srv://pwa:pwa123@pwa.lwcbi.mongodb.net/pwa?retryWrites=true&w=majority";

mongoose.connect(URI,{useNewUrlParser: true});


app.use("/" , todoRoutes);


const PORT = process.env.PORT || 9000 ;
app.listen(PORT , ()=>{
    console.log('Server started in port '+PORT);
})


let allowCrossDomain = (req , res, next) => {
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers','Content-Type, Access-Control-Allow-Headers, X-Requested-With,Accept ');
    next();
};

app.use(allowCrossDomain);
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  
  app.options('*', function (req,res) { res.sendStatus(200); });