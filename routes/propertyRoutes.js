const express = require("express");
const router = express.Router();
const propertyController = require("../controllers/property/propertyController");
//const authMiddleware = require('../middlewares/authMiddleware'); // Valida JWT
//const isAdmin = require('../middlewares/isAdminMiddleware');

//router.use(authMiddleware); // Todas as rotas abaixo precisam de login
//router.use(isAdmin);        // E todas precisam de ADMIN

router.post("/", propertyController.createProperty);
router.get("/", propertyController.getAllProperties);
router.get("/:id", propertyController.getPropertyById);
router.put("/:id", propertyController.updateProperty);
router.delete("/:id", propertyController.deleteProperty);

module.exports = router;
