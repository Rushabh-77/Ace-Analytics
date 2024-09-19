const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.js');
const User = require('./User.js');
const Book = require('./Book.js');

const Cart = sequelize.define('Cart', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
        },
    }
});

module.exports = Cart;
