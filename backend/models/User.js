
const moongoose = require('../db/conn');
const {Schema} = moongoose;

const User = moongoose.model(
 "User",
 new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    fone:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required: true
    },
    image:{
        type:String
    },
},
    {timestamps: true},

 ),
)
module.exports = User;