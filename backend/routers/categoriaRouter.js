const router = require ('express').Router();

const CategoriaController = require('../controllers/categoriaController');

router.post('/categoriaProduto',CategoriaController.categoriaProduto);


module.exports = router;