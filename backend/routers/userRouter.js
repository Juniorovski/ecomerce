const router = require('express').Router();
const userController = require('../controllers/userController');
const checkToken = require('../helpers/verifyToken');
const {imageUpload} = require('../helpers/image-upload');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/getUser', userController.getUser);
router.get('/searchById/:id',userController.searchUser);
router.get('/checkUser', userController.checkUser);
router.patch('/update/:id',checkToken,imageUpload.single("image"),userController.update);

module.exports = router;