const BlogPost = require("../../models/BlogPost");

exports.createBlogPost = async (req, res) => {
  try {
    const data = { ...req.body };
    data.id = Math.floor(Math.random() * 9_000_000) + 1_000_000;
    delete data.createdAt;
    delete data.updatedAt;

    const blogPost = await BlogPost.create(data);

    res.status(201).json({
      message: "BlogPost criada com sucesso",
      blogPost,
    });
  } catch (error) {
    console.error("Erro ao criar propriedade:", error);
    res
      .status(400)
      .json({ error: "Erro ao criar propriedade", details: error.message });
  }
};

exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await BlogPost.findAll();
    res.status(200).json(blogs);
  } catch (error) {
    console.error("Erro ao listar blogs:", error);
    res.status(500).json({ error: "Erro ao listar blogs" });
  }
};

exports.getBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    const blogPost = await BlogPost.findByPk(id);

    if (!blogPost) {
      return res.status(404).json({ error: "BlogPost não encontrada" });
    }

    res.status(200).json(blogPost);
  } catch (error) {
    console.error("Erro ao buscar blogPost:", error);
    res.status(500).json({ error: "Erro ao buscar blogPost" });
  }
};

exports.updateBlog = async (req, res) => {
  try {
    const { id } = req.params;

    // Busca a BlogPost antes da atualização
    const BlogPostBefore = await BlogPost.findByPk(id);
    if (!BlogPostBefore) {
      return res.status(404).json({ error: "BlogPostBefore não encontrada" });
    }

    // Atualiza a BlogPost
    const [updated] = await BlogPost.update(req.body, { where: { id } });

    if (updated === 0) {
      return res
        .status(404)
        .json({ error: "BlogPost não encontrada para atualização" });
    }

    // Busca a propriedade atualizada
    const updatedBlogPost = await BlogPost.findByPk(id);

    res.status(200).json({
      message: "BlogPost atualizada com sucesso",
      blog: updatedBlogPost,
    });
  } catch (error) {
    console.error("Erro ao atualizar BlogPost:", error);
    res
      .status(400)
      .json({ error: "Erro ao atualizar BlogPost", details: error.message });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await BlogPost.destroy({
      where: { id },
    });

    if (deleted === 0) {
      return res
        .status(404)
        .json({ error: "BlogPost não encontrada para exclusão" });
    }

    res.status(200).json({ message: "BlogPost deletada com sucesso" });
  } catch (error) {
    console.error("Erro ao deletar BlogPost:", error);
    res.status(500).json({ error: "Erro ao deletar BlogPost" });
  }
};
