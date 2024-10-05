const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

router.get('/getTopCustomer',customerController.getTopCustomer);
router.post('/addCustomer',customerController.addCustomer);

module.exports=router;