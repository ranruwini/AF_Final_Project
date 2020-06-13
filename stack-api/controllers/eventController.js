const express = require('express')
var router = express.Router()
var ObjectID= require('mongoose').Types.ObjectId


var { event } = require('../models/event')

/* APIs for manage events when reserving */


router.get('/',(req,res)=>{
    event.find((err,docs)=>{
        if(!err){
            res.send(docs)
        }else{
            console.log('Error while retrieving all records : '+JSON.stringify(err,undefined,2))
        }
    })
})

/* reserve an event */
router.post('/',(req,res)=>{
    var newRecord= new event({
        type: req.body.type,
        email: req.body.email,
        EveId: req.body.EveId,
        EveName: req.body.EveName,
        EvePrice: req.body.EvePrice,
        EveDescription : req.body.EveDescription,
        total : req.body.total,
        EveImage : req.body.EveImage
    })

    newRecord.save((err,docs)=>{
        if(!err){
            res.send(docs)
        }else{
            console.log('Error while creating new records : '+JSON.stringify(err,undefined,2))
        }
    })
})

/* Update event which is reserved  */
router.put('/:id',(req,res)=>{
    if(!ObjectID.isValid(req.params.id)){
        return res.status(400).send('No record with given id : '+req.params.id)
    }

    var updateRecords={
        type: req.body.type,
        payment: req.body.payment
    }

    event.findByIdAndUpdate(req.params.id, { $set: updateRecords},{new:true}, (err,docs)=>{
        if(!err){
            res.send(docs)
        }else{
            console.log('Error while updating records : '+JSON.stringify(err,undefined,2))
        }
    })
})

/* Delete event which is reserved */
router.delete('/:id',(req,res)=>{
    if(!ObjectID.isValid(req.params.id)){
        return res.status(400).send('No record with given id : '+req.params.id)
    }

    event.findByIdAndRemove(req.params.id,(err,docs)=>{
        if(!err){
            res.send(docs)
        }else{
            console.log('Error while updating records : '+JSON.stringify(err,undefined,2))
        }
    })
})

module.exports = router