const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const Token = sequelize.define('Token', {
  token: {
    type: DataTypes.TEXT,
    allowNull: false
  }
});

User.hasMany(Token);
Token.belongsTo(User);

module.exports = Token;
