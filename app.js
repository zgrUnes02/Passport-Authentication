const express = require('express') ;
const app = express() ;
const mongoose = require('mongoose') ;
const dotenv = require('dotenv').config() ;
const PORT = process.env.PORT || 4001 ;
const EmitterEvent = require('node:events') ;
const router = require('./routes/route');
const emitter = new EmitterEvent() ;
const passport = require('passport');
const path = require('node:path') ;
const cookieSession = require('cookie-session') ;

//* Cookie Session 
app.use(cookieSession({
    maxAge : 20000 ,
    keys : [process.env.secret] ,
})) ;
app.use(passport.initialize()) ;
app.use(passport.session()) ;

//* Middleware 
app.use(express.urlencoded({ extended : false })) ;
app.set('view engine' , 'ejs') ;
app.use(router) ;
app.use(express.static(path.join(__dirname , 'public'))) ;

emitter.on('serverRunningWithSuccess' , (port) => {
    console.log(`The server is running on http://localhost:${port}`) ;
}) 

app.listen(PORT , emitter.emit('serverRunningWithSuccess' , PORT)) ; 
