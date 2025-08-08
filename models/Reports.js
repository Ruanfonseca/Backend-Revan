const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Reports = sequelize.define("Reports", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  totalProperties: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  sellerProperties: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  totalRevenue: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  mediumTicket: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Reports;
