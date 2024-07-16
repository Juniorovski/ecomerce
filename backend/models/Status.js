const mongoose = require('../db/conn');

const {Schema} = mongoose;

const Status = mongoose.model(
 "Status",
 new Schema({
    name:{
        type:Boolean,
        required:true
    },
 },
 {timestamps:true}

),

 )
 module.exports= Status;