const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const UserRevan = sequelize.define('UserRevan', {
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: { isEmail: true }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM('ADMIN', 'USER'),
    defaultValue: 'USER',
    allowNull: false
  }
}, {
  tableName: 'UserRevan', 
  freezeTableName: true   // opcional: impede pluralização
});

module.exports = UserRevan;
