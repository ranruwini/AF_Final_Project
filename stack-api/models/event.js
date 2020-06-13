const mongoose = require('mongoose')

//modle for reserved event
var event = mongoose.model('event',{
    type: {type:String},
    email: {type:String},
    EveId: {type:String},
    listId: {type:String},
    EveName: {type:String},
    EvePrice: {type:Number},
    EveDescription : {type:String},
    total : {type:Number},
    EveImage : {type:String},
    payment: {type:String}
})

module.exports = { event }