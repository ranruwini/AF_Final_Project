const mongoose = require('mongoose')

//modle for category
var eventCategory = mongoose.model('category',{
    name : {type:String}
})

module.exports = { eventCategory }