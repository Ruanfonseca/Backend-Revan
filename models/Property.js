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

    price: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    priceValue: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
    },

    location: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    bedrooms: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    bathrooms: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    qtdstock: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    area: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    areaValue: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },

    type: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    mainImage: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    secondImage: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    thirdImage: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    fourthImage: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    badge: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    isNew: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },

    operation: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [["comprar", "alugar"]],
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
  },
  {
    tableName: "Property",
    freezeTableName: true,
  }
);

module.exports = Property;
