const express = require("express");
const router = express.Router();
const companyController = require("../controllers/companyController");

companyController.seedCompanies();

router.get('/getAllCompanies',companyController.getAllCompanies);
router.post('/selectCompany/:id',companyController.selectCompany);
// router.get('/getCustomerDetails',customerController.getCustomerDetails);
// router.get('/getCustomerById/:id',customerController.getCustomerById);

module.exports = router;
