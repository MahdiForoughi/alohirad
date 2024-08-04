const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const Cart = require('../models/cart');

// Get all products
router.get('/', async (req, res) => {
  const products = await Product.find();
  res.render('index', { products });
});

// Add product to cart
router.post('/add-to-cart/:id', async (req, res) => {
  const productId = req.params.id;
  let cart = await Cart.findOne();

  if (!cart) {
    cart = new Cart({ items: [], totalPrice: 0 });
  }

  const product = await Product.findById(productId);
  const existingItemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

  if (existingItemIndex >= 0) {
    cart.items[existingItemIndex].quantity += 1;
  } else {
    cart.items.push({ productId, quantity: 1 });
  }

  cart.totalPrice += product.price;
  await cart.save();

  res.redirect('/');
});

router.post('/add-product', async (req, res) => {
  const { name, price, description } = req.body;
  const product = new Product({ name, price, description });
  await product.save();
  res.redirect('/');
});


// View cart
router.get('/cart', async (req, res) => {
  const cart = await Cart.findOne().populate('items.productId');
  res.render('cart', { cart });
});

module.exports = router;
