const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Token = require('../../models/Token');
const UserRevan = require('../../models/User');

const generateAccessToken = (user) => {
  return jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES
  });
};

const generateRefreshToken = (user) => {
  return jwt.sign({ id: user.id }, process.env.REFRESH_SECRET, {
    expiresIn: process.env.REFRESH_EXPIRES
  });
};


exports.login = async (req, res) => {
  const email = req.body.email.trim();
  const password = req.body.password.trim();
  try {
    const user = await UserRevan.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado no banco' });
    }

    // 💡 Comparação explícita com debug
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    
    await Token.create({ token: refreshToken, UserId: user.id });
    res.json({ accessToken, refreshToken });
  } catch (err) {
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};



exports.refreshToken = async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.status(401).json({ error: 'Token ausente' });

  try {
    const payload = jwt.verify(refreshToken, process.env.REFRESH_SECRET);

    const stored = await Token.findOne({ where: { token: refreshToken } });
    if (!stored) return res.status(403).json({ error: 'Token inválido' });

    const newAccessToken = generateAccessToken({ id: payload.id });
    res.json({ accessToken: newAccessToken });
  } catch (err) {
    res.status(403).json({ error: 'Token expirado ou inválido' });
  }
};

exports.logout = async (req, res) => {
  const { refreshToken } = req.body;
  await Token.destroy({ where: { token: refreshToken } });
  res.json({ message: 'Logout efetuado com sucesso' });
};
