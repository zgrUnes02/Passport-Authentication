const express = require('express') ;
const app = express() ;
const mongoose = require('mongoose') ;
const dotenv = require('dotenv').config() ;
const PORT = process.env.PORT || 4001 ;
const EmitterEvent = require('node:events') ;
const router = require('./routes/route');
const emitter = new EmitterEvent() ;
const session = require('express-session') ;
const passport = require('passport');

//* Middleware 
app.use(session({
    secret : process.env.secret ,
    cookie : {
        maxAge : 30000 ,
        sameSite : 'strict'
    } ,
    saveUninitialized : true ,
})) ; 
app.use(express.urlencoded({ extended : false })) ;
app.set('view engine' , 'ejs') ;
app.use(router) ;
app.use(express.static(__dirname + '/public')) ;

emitter.on('serverRunningWithSuccess' , (port) => {
    console.log(`The server is running on http://localhost:${port}`) ;
}) 

app.listen(PORT , emitter.emit('serverRunningWithSuccess' , PORT)) ; 
