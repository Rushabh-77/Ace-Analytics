const express = require('express');
const { getCart, addToCart, removeFromCart } = require('../contollers/cartController');
const router = express.Router();

router.get('/getCart', getCart);
router.post('/add', addToCart);
router.delete('/cart/:itemId', removeFromCart);

module.exports = router;
