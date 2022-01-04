const db = require('../config');
const { Sequelize, Model, DataTypes } = require("sequelize");

const Product = db.define(
    "products",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        name: DataTypes.STRING,
        categoryId: DataTypes.INTEGER,
        price: DataTypes.FLOAT,
        quantity: DataTypes.INTEGER,
        deleted: DataTypes.BOOLEAN,
    }, 
    {
        underscored: true,
        timestamps: false,
    }

)


module.exports = Product;