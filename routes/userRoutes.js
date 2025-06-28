const express = require('express');
const router = express.Router();
const userController = require('../controllers/user/userController');
//const authMiddleware = require('../middlewares/authMiddleware'); // Valida JWT
//const isAdmin = require('../middlewares/isAdminMiddleware'); 

//router.use(authMiddleware); // Todas as rotas abaixo precisam de login
//router.use(isAdmin);        // E todas precisam de ADMIN

router.post('/', userController.createUser);
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
