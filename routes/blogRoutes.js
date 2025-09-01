const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blog/blogController");
//const authMiddleware = require('../middlewares/authMiddleware'); // Valida JWT
//const isAdmin = require('../middlewares/isAdminMiddleware');

//router.use(authMiddleware); // Todas as rotas abaixo precisam de login
//router.use(isAdmin);        // E todas precisam de ADMIN

router.post("/posts", blogController.createBlogPost);
router.get("/posts", blogController.getAllBlogs);
router.get("/posts/:id", blogController.getBlogById);
router.put("/posts/:id", blogController.updateBlog);
router.delete("/posts/:id", blogController.deleteBlog);

module.exports = router;
