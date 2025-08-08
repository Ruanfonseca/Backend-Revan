const express = require("express");
const app = express();
require("dotenv").config();

const sequelize = require("./config/database");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const propertyRoutes = require("./routes/propertyRoutes");
const mailRoutes = require("./routes/mailRoutes");
const reportsRoutes = require("./routes/reportsRoutes");

const corsMiddleware = require("./middlewares/corsMiddleware");

app.use(corsMiddleware);

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/properties", propertyRoutes);
app.use("/api/send-mail", mailRoutes);
app.use("/api/reports", reportsRoutes);

sequelize.sync({ alter: true }).then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Servidor rodando na porta ${process.env.PORT}`);
  });
});
