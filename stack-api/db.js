//create a database connection
const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://ranruwini:ranruwini@cluster0-8fctu.mongodb.net/test?retryWrites=true&w=majority',{useNewUrlParser:true,useUnifiedTopology:true},
    err => {
        if(!err){
            console.log("connection success!")
        }else{
            console.log("connection fail!" + JSON.stringify(err, undefined , 2))
        }
    })