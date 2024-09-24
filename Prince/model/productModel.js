const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
  
        name: {
            type: String,
            required: true
        },
        salesPercentage: {
            type: Number,
            required: true
        },
        projects: {
            type: Number,
            required: true
        },
        popularity: {
            type: Number,
            required: true
        },
        price: {
            type: Number,
            required:true
        }
    });

    const product = mongoose.model('products',productSchema);

    module.exports = product;

