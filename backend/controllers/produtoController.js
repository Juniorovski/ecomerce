const Produto = require("../models/Produto");
const Categoria = require("../models/Categoria");

module.exports = class ProdutoController {
  
  //cadastra produto 
  static async registerProduto(req, res) {
    const { name, descricao, preco, quantidade, categoriaNome } = req.body;

    if (!name) {
      res.status(422).json({ msg: "Field is required!" });
      return;
    }
    if (!descricao) {
      res.status(422).json({ msg: "Field is required" });
      return;
    }
    if (!preco) {
      res.status(422).json({ msg: "Field is required" });
    }
    if (!quantidade) {
      res.status(422).json({ msg: "Field is required" });
    }
    let categoriaId;
    try {
      let categoria = await Categoria.findOne({ name: categoriaNome });

      if (!categoria) {
        categoria = new Categoria({ name: categoriaNome });
        await categoria.save();
      }
      categoriaId = categoria._id;
    } catch (error) {
      return res.status(500).json({ msg: "Categoria nao encontrada!" });
    }

    const produto = new Produto({
      name,
      descricao,
      preco,
      quantidade,
      categoria: categoriaId,
    });

    if (req.file) {
      produto.image = req.file.filename;
    }

    try {
      const newProduto = produto.save();
      res.status(201).json(newProduto);
    } catch (error) {
      res.status(500).json({ msg: error });
    }
  }
  
 //lista todos os produtos
  static async listProdutos(req, res) {
    try {
      const produto = await Produto.find({}).populate("categoria");

      if (!produto) {
        return res.status(404).json({ msg: "produto nao encontrado!" });
      }
      res.status(200).json({ produto });
    } catch (error) {
      console.log(error);
    }
  }

  //deleta todos os produtos
  static async deleteProduto(req, res) {
    const { id } = req.params;
   


    try {
      const produto = await Produto.findByIdAndDelete(id);

      if (!produto) {
        return res.status(404).json({ msg: "Produto não encontrado!" });
      }

      res.status(200).json({ msg: "Produto deletado com sucesso!" });
    } catch (error) {
      res.status(500).json({ msg: "Erro ao deletar produto", error });
    }
  }
  
  //atualiza o produto
  static async updateProduto(req,res){

    const { name, descricao, preco, quantidade, categoriaNome } = req.body;
    const {id} = req.params;
    const produto = await Produto.findById(id);

    if (!name) {
      res.status(422).json({ msg: "Field is required!" });
      return;
    }
    if (!descricao) {
      res.status(422).json({ msg: "Field is required" });
      return;
    }
    if (!preco) {
      res.status(422).json({ msg: "Field is required" });
      return;
    }
    if (!quantidade) {
      res.status(422).json({ msg: "Field is required" });
      return;
    }
    let categoriaId;

    try {
      let categoria = await Categoria.findOne({ name: categoriaNome });

      if (!categoria) {
        categoria = new Categoria({ name: categoriaNome });
        await categoria.save();
      }
      categoriaId = categoria._id;
    } catch (error) {
      return res.status(500).json({ msg: "Categoria nao encontrada!" });
    }

    if (req.file) {
      produto.image = req.file.filename;
    }

    produto.name = name;
    produto.descricao = descricao;
    produto.preco= preco;
    produto.quantidade = quantidade;
    produto.categoriaNome = categoriaNome;

    try {
      await Produto.findOneAndUpdate(
        {_id: produto.id},
        {$set:produto},
        {new:true},
      );
      res.status(200).json({msg:"Produto atualizado com sucesso!"});
      
    } catch (error) {
      res.status(500).json({message: err});
    }
  }
}
