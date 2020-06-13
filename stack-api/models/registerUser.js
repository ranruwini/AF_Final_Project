const mongoose = require('mongoose')

//modle for registered user
var RegisterUser = mongoose.model('register',{
    fname : {type:String},
    lname : {type:String},
    email : {type:String},
    phone : {type:String},
    password : {type:String},
    type : {type:String}
})

module.exports = { RegisterUser }