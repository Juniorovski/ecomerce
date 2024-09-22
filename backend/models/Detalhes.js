const mongoose = require('../db/conn');

const {Schema} = mongoose;

const Detalhes = mongoose.model(
    "Detalhes",
    new Schema ({
        name:{
            type:string,
            required:true
        }
    },
    {timestamps:true}
)
)
exports.module = Detalhes;