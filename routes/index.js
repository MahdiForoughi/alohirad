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


// Delete item from cart
router.post('/remove-from-cart/:id', async (req, res) => {
  const productId = req.params.id;
  let cart = await Cart.findOne();

  if (!cart) {
    return res.redirect('/cart');
  }

  const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

  if (itemIndex >= 0) {
    const product = await Product.findById(productId);
    cart.totalPrice -= cart.items[itemIndex].quantity * product.price;
    cart.items.splice(itemIndex, 1);
    await cart.save();
  }

  res.redirect('/cart');
});

// View cart
router.get('/cart', async (req, res) => {
  const cart = await Cart.findOne().populate('items.productId');
  res.render('cart', { cart });
});

// Add default products
router.get('/add-default-products', async (req, res) => {
  const defaultProducts = [
    { name: 'محصول یک', price: 100, description: 'این یک محصول تست است' },
    { name: 'محصول دو', price: 200, description: 'این یک محصول تست است' },
    { name: 'محصول سه', price: 300, description: 'این یک محصول تست است' },
  ];

  await Product.insertMany(defaultProducts);
  res.redirect('/');
});

module.exports = router;
