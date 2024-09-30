const express = require('express');

const { setCompany,getFinancialdata,getCalenderdata} = require('../controllers/posts');

const router = express.Router();


router.post('/setCompany', setCompany);
router.get('/getFinancialdata', getFinancialdata);

router.get('/getCalenderdata', getCalenderdata);

module.exports = router;