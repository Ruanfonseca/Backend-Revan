const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth/authController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/login', auth.login);
router.post('/refresh', auth.refreshToken);
router.post('/logout', auth.logout);

router.get('/profile', authMiddleware, (req, res) => {
  res.json({ message: 'Você está autenticado', user: req.user });
});

module.exports = router;
