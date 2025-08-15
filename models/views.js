const sequelize = require("../config/database");
const { DataTypes } = require("sequelize");

const Views = sequelize.define(
  "Views",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    qtd: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "views",
    timestamps: false, // se não quiser createdAt/updatedAt automáticos
  }
);

module.exports = Views;
