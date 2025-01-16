const express = require("express");
const router = express.Router();
const homeController = require("../controllers/homeController");

router.get('/getFinancialdataForHome',homeController.getFinancialdataForHome);
router.get('/getCalendarYearDataForHome',homeController.getCalendarYearDataForHome);
router.get('/getTopProductsForHome',homeController.getTopProductsForHome);
router.get('/earningByCompany',homeController.earningByCompany);
router.get('/getSalesReportForHome',homeController.getSalesReportForHome);

module.exports = router;
