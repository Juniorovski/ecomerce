
const mongoose = require('../db/conn');

const {Schema} = mongoose;

const Pedido = mongoose.model(
   "pedido",
    new Schema ({
       name:{
        type:String,
        required:true
       },
       num_pedido:{
        type:String,
        required:true
       }
    },
    {timestamps:true}
),
)
module.exports = Pedido;