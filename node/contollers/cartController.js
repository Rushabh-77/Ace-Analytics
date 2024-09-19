const { CartItem, Book, Cart } = require("../models");

exports.getCart = async (req, res, next) => {
  try {
    const cartItems = await CartItem.findAll({
      where: { userId: req.user},
      include: [{ model: Book }],
    });
    res.json(cartItems);
  } catch (error) {
    next(error);
  }
};

exports.addToCart = async (req, res, next) => {
  try {
    const { bookId, quantity } = req.body;

    const book = await Book.findByPk(bookId);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    let cart = await Cart.findOne({ where: { userId: req.user } });
    if (!cart) {
      cart = await Cart.create({ userId: req.user });
    }

    const cartItem = await CartItem.findOne({
      where: { cartId: cart.id, bookId },
    });

    if (cartItem) {
      cartItem.quantity += quantity;
      await cartItem.save();
    } else {
      await CartItem.create({
        cartId: cart.id,
        userId: req.user,
        bookId,
        quantity,
        price: book.price,
      });
    }

    res.status(201).json({ message: 'Book added to cart' });
  } catch (error) {
    console.error("addToCart error", error);
    next(error);
  }
};

exports.removeFromCart = async (req, res, next) => {
  try {
    const { itemId } = req.params;
    const cartItem = await CartItem.findByPk(itemId);

    if (!cartItem || cartItem.userId !== req.user) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    await cartItem.destroy();
    res.json({ message: 'Book removed from cart' });
  } catch (error) {
    next(error);
  }
};

