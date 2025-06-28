const User = require('../models/User');

module.exports = async (req, res, next) => {
  try {
    const userId = req.user.id; // vindo do token decodificado
    const user = await User.findByPk(userId);

    if (!user || user.role !== 'ADMIN') {
      return res.status(403).json({ error: 'Acesso restrito a administradores' });
    }

    next();
  } catch (error) {
    res.status(500).json({ error: 'Erro na verificação de permissão' });
  }
};
