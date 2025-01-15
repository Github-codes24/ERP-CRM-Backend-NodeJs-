const express = require('express');

const { setCompany,getFinancialdata,getCalenderdata,addSalesReport, getSalesReport,
    getTotalbill,getClearedbill,getPendingbill} = require('../controllers/salesController');

const router = express.Router();
const companyMiddleware = require("../middlewares/companyMiddleware");
// router.use(companyMiddleware);

router.post('/setCompany', setCompany);
router.get('/getFinancialdata', getFinancialdata);
router.get('/getCalenderdata', getCalenderdata);
router.post('/salesReport',addSalesReport);
router.get('/salesReport',getSalesReport);
router.get('/totalbill',getTotalbill);
router.get('/clearedbill',getClearedbill);
router.get('/pendingbill',getPendingbill);

module.exports = router;