const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');
const companyMiddleware = require("../middlewares/companyMiddleware");
// router.use(companyMiddleware);

router.get('/getTopCustomer',customerController.getTopCustomer);
router.post('/addCustomer',customerController.addCustomer);
router.get('/getCustomerDetails',customerController.getCustomerDetails);
router.get('/getCustomerById/:id',customerController.getCustomerById);

module.exports=router;