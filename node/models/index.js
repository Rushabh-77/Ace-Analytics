const User = require('./User');
const Book = require('./Book');
const Cart = require('./Cart');
const CartItem = require('./CartItem');

// User.hasMany(Cart, { foreignKey: 'userId', onDelete: 'CASCADE' });
// Cart.belongsTo(User, { foreignKey: 'userId' });

// Book.hasMany(Cart, { foreignKey: 'bookId', onDelete: 'CASCADE' });
// Cart.belongsTo(Book, { foreignKey: 'bookId', as: 'book' });

Cart.hasMany(CartItem, { foreignKey: 'cartId' });
CartItem.belongsTo(Cart, { foreignKey: 'cartId' });

Book.hasMany(CartItem, { foreignKey: 'bookId' });
CartItem.belongsTo(Book, { foreignKey: 'bookId' });

User.hasOne(Cart, { foreignKey: 'userId' });
Cart.belongsTo(User, { foreignKey: 'userId' });

module.exports = { User, Book, Cart, CartItem };
