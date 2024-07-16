const mongoose = require('../db/conn');

const {Schema}= mongoose;

const Produto = mongoose.model(
    "Produto",
    new Schema({
       name:{
        type:String,
        required:true
       },
       descricao:{
        type:String,
        required:true
       },
       preco:{
        type:Number,
        min:[0, "Preco não pode ser negativo"],
        required:true
       },
       quantidade:{
           type:Number,
           required:true
       },
     image:{
        type:String
     },
     categoria:{
        type:mongoose.Schema.Types.ObjectId, 
        ref:'Categoria',
        required:true,
     },
    },
    {timestamps:true},
),

)
module.exports = Produto;