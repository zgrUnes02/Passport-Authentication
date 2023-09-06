
const express = require('express') ;
const passport = require('passport');
const router = express.Router() ;
const passportSetup = require('../config/passport-setup.js') ;
const mongoose = require('mongoose') ;
const session = require('express-session') ;

mongoose.connect('mongodb://localhost:27017/passport')
.then(() => {
    console.log('The connect with database has been approved with success') ;
}).catch((error) => {
    console.log('Something went wrong' , error)
})

//* Get Home page
router.get('/' , (req , res) => {
    res.render('home') ;
}) ;

//* Get Login Page
router.get('/login' , (req , res) => {
    res.render('login') ;
}) ;

//* Send Data From The Form
router.post('/login' , (req , res) => {
    res.status(200).json({data : req.body}) ;
}) ;

//* profile 
router.get('/profile' , (req , res) => {
    try {
        console.log(req.session.user) ;
    }
    catch ( error ) {
        res.status(200).json({error : error}) ;
    }
})

//* Connect With google Account
router.get('/auth/google' , passport.authenticate('google' , () => { scope : ['profile'] })) ;

router.get('/auth/google/redirect' , passport.authenticate('google') ,  (req, res) => {
    req.session.user = req.user ;
    req.session.authorized = true ;
    res.redirect('/profile') ;
}) ;

//* Connect With Facebook Account
router.get('/facebook' , (req , res) => {
    res.status(200).send('facebook route') ;
}) ;

//* Logout
router.get('/logout' , (req , res) => {
    res.status(200).send('logout') ;
}) ;

//* Export My routes
module.exports = router ;
