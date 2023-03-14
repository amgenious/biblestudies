require('dotenv').config()
const express = require('express')
const morgan = require ('morgan')
const mongoose = require('mongoose')

const app = express();

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));


//connection to database
mongoose.set('strictQuery', true)
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('connected to database')
    })
    .catch((err) => {
        console.log(err)
    })
  
app.use('/', require('./routes/router'))



app.listen(process.env.PORT, () =>{
    console.log("Started on http://localhost:",+process.env.PORT)
})