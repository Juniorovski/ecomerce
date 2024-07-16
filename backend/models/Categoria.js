const mongoose = require('../db/conn');

const {Schema} = mongoose;

const Categoria = mongoose.model(
   "Categoria",
    new Schema ({
       name:{
        type:String,
        required:true
       },
    },
    {timestamps:true}
),
)
module.exports = Categoria;