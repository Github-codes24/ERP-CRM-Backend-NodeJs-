const mongoose = require('mongoose');
const customerSchema = new mongoose.Schema({

    customerName: {
        type: String,
        required: true
    },
    customerSince: {
        type: Number,
        required: true
    }
})

const customer = mongoose.model('Customer',customerSchema);

module.exports = customer;