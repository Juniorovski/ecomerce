const Pedido = require("../models/Pedido");
const Produto = require("../models/Produto");

module.exports = class PedidoController {

  static async savePedido(req, res) {
    const { name, num_pedido, produtoName } = req.body;

    let produtoId;

    try {
     const produto = new Produto();

      produto = await Produto.findOne({ name: produtoName });
      produtoId = produto._id;
    } catch (error) {
      console.log(error);
    }

    const pedido = new Pedido({
      name,
      num_pedido,
      produtoName: produtoId,
    });

    try {
       const newPedido = pedido.save(); 
       res.status(201).json(newPedido);
    } catch (error) {
      console.logo(error)
    }
  }

 static async listarPedidos(req ,res){
    try {
      const pedido = await Pedido.find({});

      if(!pedido){
        res.status(400).json({msg:"Pedido nao exite!"});
      }   
      res.status(200).json({pedido})   
    } catch (error) {
      console.log(error)
    }

 }

  static async deletePedido(req, res) {
    const { _id } = req.params;

    try {
      const pedido = await Pedido.findByAndDelete({_id});

      if (!pedido) {
        return res.status(500).json({ msg: "Pedido não encontardo!" });
      }
      res.status(200).json({ msg: "Pedido deletado com sucesso!" });
      res.status(500).json({ msg: "Error ao acessar servidor!" });

    } catch (error) {}
  }

};
