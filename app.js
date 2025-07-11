const express = require('express');
const app = express();
require('dotenv').config();

const sequelize = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const corsMiddleware = require('./middlewares/corsMiddleware');

app.use(corsMiddleware);

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/user',userRoutes)

// Conecta ao banco e inicia servidor
sequelize.sync().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Servidor rodando na porta ${process.env.PORT}`);
  });
});
