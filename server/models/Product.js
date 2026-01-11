const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a product name'],
        trim: true,
    },
    description: {
        type: String,
        required: [true, 'Please provide a product description'],
    },
    price: {
        type: Number,
        required: [true, 'Please provide a price'],
        min: 0,
    },
    category: {
        type: String,
        required: [true, 'Please provide a category'],
        enum: ['Electronics', 'Clothing', 'Home & Garden', 'Sports', 'Books', 'Toys', 'Other'],
    },
    image: {
        type: String,
        default: 'https://via.placeholder.com/300x300?text=Product+Image',
    },
    stock: {
        type: Number,
        required: true,
        min: 0,
        default: 0,
    },
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
    },
    numReviews: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Product', productSchema);
