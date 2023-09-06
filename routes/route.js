
const express = require('express') ;
const passport = require('passport');
const router = express.Router() ;
const passportSetup = require('../config/passport-setup.js') ;
const mongoose = require('mongoose') ;

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
    if ( req.user ) {
        res.redirect('/profile') ;
    }
    else {
        res.render('login') ;
    }
    
}) ;

//* Send Data From The Form
router.post('/login' , (req , res) => {
    res.status(200).json({data : req.body}) ;
}) ;

//* Profile
router.get('/profile' , (req , res) => {
    if ( req.user ) {
        res.render('profile' , {user : req.user}) ;
    }
    else {
        res.redirect('/login') ;
    }
}) ;

//* Connect With google Account
router.get('/auth/google' , passport.authenticate('google' , () => { scope : ['profile'] })) ;

router.get('/auth/google/redirect' , passport.authenticate('google') ,  (req, res) => {
    res.redirect('/profile') ;
}) ;

//* Connect With Facebook Account
router.get('/facebook' , (req , res) => {
    res.status(200).send('facebook route') ;
}) ;

//* Logout
router.get('/logout' , (req , res) => {
    if ( !req.user ) {
        res.redirect('/login') ;
    }
    else {
        req.logOut() ;
        res.redirect('/login') ;
    }
}) ;

//* Export My routes
module.exports = router ;
