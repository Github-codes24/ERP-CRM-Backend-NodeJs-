const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

router.get('/getTopCustomer',customerController.getTopCustomer);

module.exports=router;