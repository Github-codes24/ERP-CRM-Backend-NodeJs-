const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');
const companyMiddleware = require("../middlewares/companyMiddleware");
// router.use(companyMiddleware);

router.get('/getTopCustomer',customerController.getTopCustomer);
router.post('/addCustomer',customerController.addCustomer);
router.get('/getCustomerDetails',customerController.getCustomerDetails);

router.get('/getTotalCustomerNo',customerController.getTotalCustomerNo);
router.get('/getTotalActiveCustomerNo',customerController.getTotalActiveCustomerNo);
router.get('/getTotalInactiveCustomerNo',customerController.getTotalInactiveCustomerNo);

router.get('/getCustomerById/:id',customerController.getCustomerById);
router.put('/editCustomerById/:id',customerController.editCustomerById);

router.get('/getOrganizationNames',customerController.getOrganizationNames);
router.get('/getOrganizationTypes',customerController.getOrganizationTypes);
router.get('/getOrganizationStatus',customerController.getOrganizationStatus);

module.exports=router;