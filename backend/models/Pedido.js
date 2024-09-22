const mongoose = require('../db/conn');

const {Schema} = mongoose;

const Pedido = mongoose.model(
    "Pedido" ,
     new Schema ({
        name:{
            type:string,
            required: true
        },
        num_pedido:{
            type:string,
            required:true
        },
        
     },
     {timestamps:true}
    
    )
)
module.exports = Pedido;