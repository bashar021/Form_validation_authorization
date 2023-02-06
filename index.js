'use strict'
const express = require('express')
const mongoose = require('mongoose');
const dotenv = require('dotenv').config()
const bcrypt = require('bcrypt');
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
const { body, validationResult } = require('express-validator');
const ConnectToDb = require('./db') // importing mongodb connection 
const User = require('./modals/User') // importing user schema
const path = require('path')
const app = express()
const port = process.env.PORT || 80 // runnning on port 80

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())  // body pareser to encode the data into json format 
app.use('/static', express.static((path.join(__dirname, 'public'))))
app.set('views', path.join(__dirname, 'views'));  
app.use('/user/',require('./routes/userauth')) // using seprate route
app.use(express.json()) // is used to deal withe json file to send it to client side 
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded

app.use(cookieParser()) // adding cookieparser to get the cookie from client

ConnectToDb()  // calling the mongodb connection function exported from the db.js

app.get('/', function (req, res) {
  res.send('Welocome')
})
// geting login request
app.get('/login',function(req,res){
    res.render('form.ejs')
})
app.listen(port,()=>{
    console.log('your server is running on port'+ port)
}) 