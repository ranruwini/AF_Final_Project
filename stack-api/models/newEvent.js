const mongoose = require('mongoose')

//modle for new event
var NewEvent = mongoose.model('newevent',{
    name : {type:String},
    category : {type:String},
    description : {type:String},
    price : {type:Number},
    image : {type:String},
})

module.exports = { NewEvent }