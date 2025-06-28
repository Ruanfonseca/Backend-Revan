const bcrypt = require('bcrypt');
const UserRevan = require('../../models/User');

// 📌 Criar usuário (ADMIN ou USER)
exports.createUser = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    const hash = await bcrypt.hash(password, 10);
     const user = await UserRevan.create({ email, password: hash, role });
   

    res.status(201).json({
      message: 'Usuário criado com sucesso',
      user: { id: user.id, email: user.email, role: user.role }
    });
  } catch (error) {
    console.error('🔥 Erro ao criar usuário:', error);
    res.status(400).json({ error: 'Erro ao criar usuário', details: error.message });
  }
};


// 📌 Listar todos os usuários
exports.getAllUsers = async (req, res) => {
  try {
    const users = await UserRevan.findAll({
      attributes: ['id', 'email', 'role', 'createdAt']
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar usuários' });
  }
};

// 📌 Buscar usuário por ID
exports.getUserById = async (req, res) => {
  try {
    const user = await UserRevan.findByPk(req.params.id, {
      attributes: ['id', 'email', 'role', 'createdAt']
    });

    if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar usuário' });
  }
};

// 📌 Atualizar usuário
exports.updateUser = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    const user = await UserRevan.findByPk(req.params.id);

    if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });

    if (email) user.email = email;
    if (password) user.password = await bcrypt.hash(password, 10);
    if (role) user.role = role;

    await user.save();

    res.json({ message: 'Usuário atualizado com sucesso', user: { id: user.id, email: user.email, role: user.role } });
  } catch (error) {
    res.status(400).json({ error: 'Erro ao atualizar usuário', details: error.message });
  }
};

// 📌 Deletar usuário
exports.deleteUser = async (req, res) => {
  try {
    const user = await UserRevan.findByPk(req.params.id);

    if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });

    await user.destroy();

    res.json({ message: 'Usuário deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar usuário' });
  }
};
