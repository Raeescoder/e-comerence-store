const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Product = require('../models/Product');
const { protect } = require('../middleware/auth');

// @route   GET /api/cart
// @desc    Get user's cart
// @access  Private
router.get('/', protect, async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate('cart.product');
        res.json(user.cart);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// @route   POST /api/cart
// @desc    Add item to cart
// @access  Private
router.post('/', protect, async (req, res) => {
    try {
        const { productId, quantity } = req.body;

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        if (product.stock < quantity) {
            return res.status(400).json({ message: 'Insufficient stock' });
        }

        const user = await User.findById(req.user._id);

        // Check if product already in cart
        const existingItem = user.cart.find(
            (item) => item.product.toString() === productId
        );

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            user.cart.push({ product: productId, quantity });
        }

        await user.save();
        await user.populate('cart.product');

        res.json(user.cart);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// @route   PUT /api/cart/:itemId
// @desc    Update cart item quantity
// @access  Private
router.put('/:itemId', protect, async (req, res) => {
    try {
        const { quantity } = req.body;

        const user = await User.findById(req.user._id);
        const cartItem = user.cart.id(req.params.itemId);

        if (!cartItem) {
            return res.status(404).json({ message: 'Cart item not found' });
        }

        const product = await Product.findById(cartItem.product);
        if (product.stock < quantity) {
            return res.status(400).json({ message: 'Insufficient stock' });
        }

        cartItem.quantity = quantity;
        await user.save();
        await user.populate('cart.product');

        res.json(user.cart);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// @route   DELETE /api/cart/:itemId
// @desc    Remove item from cart
// @access  Private
router.delete('/:itemId', protect, async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        // Filter out the item
        user.cart = user.cart.filter(
            (item) => item._id.toString() !== req.params.itemId
        );

        await user.save();
        await user.populate('cart.product');

        res.json(user.cart);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;
