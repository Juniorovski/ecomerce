const router = require('express').Router();
const ProdutoController = require('../controllers/produtoController');
const{ imageUpload }= require('../helpers/image-upload');

router.post('/registerProduto', imageUpload.single("image"),ProdutoController.registerProduto);
router.get('/listProdutos',ProdutoController.listarProdutos);
router.delete('/deleteProduto/:id', ProdutoController.deleteProduto);
router.patch('/updateProduto/:id', imageUpload.single("image"),ProdutoController.updateProduto);

module.exports = router;