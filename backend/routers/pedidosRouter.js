
const router = require('express').Router();

const PedidoController = require('../controllers/pedidoController');

router.post('/savePedido',PedidoController.savePedido);
router.get('/listarPedidos', PedidoController.listarPedidos);
router.delete('/deletePedido/:id',PedidoController.deletePedido);

module.exports = router;