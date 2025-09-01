const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const BlogPost = sequelize.define("BlogPost", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  excerpt: {
    type: DataTypes.STRING(500),
    allowNull: false,
  },
  author: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  publishDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("rascunho", "publicado", "arquivado"),
    allowNull: false,
    defaultValue: "rascunho",
  },
  category: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  tags: {
    type: DataTypes.JSON, // armazena array de strings
    allowNull: false,
    defaultValue: [],
  },
  featuredImage: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  seoTitle: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  seoDescription: {
    type: DataTypes.STRING(500),
    allowNull: true,
  },
  readTime: {
    type: DataTypes.INTEGER, // em minutos
    allowNull: true,
  },
  views: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0,
  },
});

module.exports = BlogPost;
