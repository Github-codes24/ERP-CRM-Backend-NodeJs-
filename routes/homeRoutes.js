const express = require("express");
const router = express.Router();
const homeController = require("../controllers/homeController");

router.get('/getFinancialdataForHome',homeController.getFinancialdataForHome);
router.get('/getCalendarYearDataForHome',homeController.getCalendarYearDataForHome);

module.exports = router;
