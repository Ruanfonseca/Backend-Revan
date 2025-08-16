const express = require("express");
const router = express.Router();
const salesController = require("../controllers/sale/saleController");
//const authMiddleware = require('../middlewares/authMiddleware'); // Valida JWT
//const isAdmin = require('../middlewares/isAdminMiddleware');

//router.use(authMiddleware); // Todas as rotas abaixo precisam de login
//router.use(isAdmin);        // E todas precisam de ADMIN

router.post("/", salesController.createSale);
router.get("/all", salesController.getAllSales);

module.exports = router;
