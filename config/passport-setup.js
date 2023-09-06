const passport = require('passport') ;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy ;
const keys = require('./keys');
const userModel = require('../models/userModel');

//* Serialization Of User  
passport.serializeUser((user , done) => {
    done(null , user.id) ;
}) ;
passport.deserializeUser( async (id , done) => {
    const user = await userModel.findById(id) ;
    done(null , user) ;
}) ;

passport.use(
    new GoogleStrategy({
        callbackURL : 'http://localhost:4000/auth/google/redirect' ,
        clientID : keys.google.clientID ,
        clientSecret : keys.google.clientSecret ,
        scope : ['profile'] ,
        proxy : true
    } , async ( accessToken , refreshToken , profile , done ) => {
        //* callback function 
        const userExists = await userModel.find({googleId : profile.id}) ;
        if ( userExists.length != 0 ) {
            done(null , userExists[0]) ;
        }
        else {
            const newUser = await userModel.create({
                name : profile.displayName ,
                googleId : profile.id ,
            }) ;
            done(null , newUser) ;
            console.log('The user has been created with success') ;
        }
    })  
) ;