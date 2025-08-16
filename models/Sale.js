const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Property = require("./Property");

const Sale = sequelize.define(
  "Sale",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },

    negotiationDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    clientName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [2],
          msg: "Nome do cliente deve ter pelo menos 2 caracteres",
        },
      },
    },

    propertyId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Property",
        key: "id",
      },
      allowNull: false,
    },

    realtorName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [2],
          msg: "Nome do corretor/imobiliária deve ter pelo menos 2 caracteres",
        },
      },
    },

    paymentMethod: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    deliveryDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "Sale",
    freezeTableName: true,
  }
);

Sale.belongsTo(Property, { foreignKey: "propertyId" });
Property.hasMany(Sale, { foreignKey: "propertyId" });

module.exports = Sale;
