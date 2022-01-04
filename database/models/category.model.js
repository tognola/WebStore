const db = require('../config');
const { Sequelize, Model, DataTypes } = require("sequelize");
const Product = require('./product.model');

const Category = db.define(
    "categories",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        name: DataTypes.STRING,
        deleted: DataTypes.BOOLEAN,
    }, 
    {
        underscored: true,
        timestamps: false,
    }
)

Product.belongsTo( Category, {foreignKey: 'categoryId'})
Category.hasMany( Product, {as: 'products' ,foreignKey: 'categoryId'})

module.exports = Category;