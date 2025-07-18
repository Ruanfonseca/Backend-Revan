const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Property = sequelize.define(
  "Property",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    price: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [["casa", "apartamento", "terreno", "comercial"]],
      },
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "disponivel",
      validate: {
        isIn: [["disponivel", "vendido", "alugado", "reservado"]],
      },
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    neighborhood: {
      type: DataTypes.STRING,
    },
    city: {
      type: DataTypes.STRING,
    },
    zipCode: {
      type: DataTypes.STRING,
    },
    bedrooms: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    bathrooms: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    area: {
      type: DataTypes.FLOAT,
    },
    garage: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    images: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: "Property",
    freezeTableName: true,
  }
);

module.exports = Property;
