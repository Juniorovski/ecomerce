const mongoose = require('../db/conn');

const {Schema} = mongoose;

const Avaliacao = mongoose.model(
    "Avaliacao",
    new Schema({
        name:{
            type:string,
            required:true
        },
        rate:{
            type:Number,

        }
    })
)
module.exports = Avaliacao;