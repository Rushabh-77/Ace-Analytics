const Order = require('../models/Order');
const OrderItem = require('../models/OrderItem');
const Cart = require('../models/Cart');
const CartItem = require('../models/CartItem');
const { Book } = require('../models');

exports.placeOrder = async (req, res) => {
    try {
      const userId = req.user; 
      const cart = await Cart.findOne({
        where: { userId },
        include: [{ model: CartItem, include: [{ model: Book }] }],
      });
  
      if (!cart || cart.CartItems.length === 0) {
        return res.status(400).json({ message: 'Cart is empty' });
      }
  
      let totalAmount = 0;
      cart.CartItems.forEach(item => {
        totalAmount += item.price * item.quantity;
      });
  
      const order = await Order.create({
        userId,
        totalAmount,
        status: 'pending',
      });
  
      const orderItems = cart.CartItems.map(item => ({
        orderId: order.id,
        bookId: item.bookId,
        quantity: item.quantity,
        price: item.price,
      }));
  
      await OrderItem.bulkCreate(orderItems);
  
      await CartItem.destroy({ where: { cartId: cart.id } });
  
      res.status(201).json({ message: 'Order placed successfully', order });
    } catch (error) {
      console.error('Error placing order:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
