const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/getTopProducts',productController.getTopProducts);
router.get('/earningPerProduct',productController.earningPerProduct);
router.get('/earningByItem',productController.earningByItem);

module.exports=router;
