const Categoria = require("../models/Categoria");

module.exports = class CategoriaController {

  static async categoriaProduto(req, res) {
    const { name } = req.body;

    try {
      const categoria = new Categoria({ name });
      const newCategoria = categoria.save();
      res.status(201).json(newCategoria);

    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Erro ao criar categoria" });
    }
  }
};
