const mongoose = require('mongoose') ;

const userSchema = new mongoose.Schema({
    name : {
        type : String ,
        required : [true , 'The name field is required'] ,
    } ,

    googleId : {
        type : String ,
        required : [true , 'The id is required'] ,
    } ,
}) ;

const userModel = mongoose.model('users' , userSchema) ;
module.exports = userModel ;