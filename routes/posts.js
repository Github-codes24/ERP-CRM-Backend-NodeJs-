const express = require('express');

const { setCompany,getFinancialdata,getCalenderdata,addSalesReport,getTotalbill,getClearedbill,getPendingbill} = require('../controllers/posts');

const router = express.Router();

router.post('/setCompany', setCompany);
router.get('/getFinancialdata', getFinancialdata);
router.get('/getCalenderdata', getCalenderdata);
router.post('/salesReport',addSalesReport);
router.get('/totalbill',getTotalbill);
router.get('/clearedbill',getClearedbill);
router.get('/pendingbill',getPendingbill);

module.exports = router;