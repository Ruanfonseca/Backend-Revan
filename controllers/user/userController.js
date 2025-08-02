const bcrypt = require("bcrypt");
const UserRevan = require("../../models/User");

exports.createUser = async (req, res) => {
  try {
    const { name, email, phone, password, role, status = "active" } = req.body;

    if (!name || !email || !phone || !password || !role) {
      return res.status(400).json({ error: "Campos obrigatórios ausentes." });
    }

    const hash = await bcrypt.hash(password, 10);
    const randomId = Math.floor(100000 + Math.random() * 900000);

    const user = await UserRevan.create({
      id: randomId,
      name,
      email,
      phone,
      password: hash,
      role,
      status,
    });

    res.status(201).json({
      message: "Usuário criado com sucesso",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        status: user.status,
      },
    });
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    res.status(400).json({
      error: "Erro ao criar usuário",
      details: error.message,
    });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await UserRevan.findAll({
      attributes: [
        "id",
        "name",
        "email",
        "role",
        "phone",
        "password",
        "status",
        "createdAt",
      ],
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar usuários" });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await UserRevan.findByPk(req.params.id, {
      attributes: ["id", "email", "role", "createdAt"],
    });

    if (!user) return res.status(404).json({ error: "Usuário não encontrado" });

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar usuário" });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await UserRevan.findByPk(id);

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }

    const updatedData = { ...req.body };

    if (updatedData.password) {
      updatedData.password = await bcrypt.hash(updatedData.password, 10);
    }

    // Atualiza os dados no modelo
    Object.assign(user, updatedData);

    await user.save();

    res.json({
      message: "Usuário atualizado com sucesso",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        status: user.status,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    res.status(400).json({
      error: "Erro ao atualizar usuário",
      details: error.message,
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await UserRevan.findByPk(req.params.id);

    if (!user) return res.status(404).json({ error: "Usuário não encontrado" });

    await user.destroy();

    res.json({ message: "Usuário deletado com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar usuário" });
  }
};
exports.getUserLogged = async (req, res) => {
  try {
    const userId = req.user.email;

    const user = await UserRevan.findByPk(userId, {
      attributes: [
        "id",
        "name",
        "email",
        "phone",
        "role",
        "status",
        "createdAt",
      ],
    });

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }

    res.json(user);
  } catch (error) {
    console.error("Erro ao buscar usuário logado:", error);
    res.status(500).json({
      error: "Erro ao buscar usuário logado",
      details: error.message,
    });
  }
};
