const express = require('express');
const router = express.Router();
const leadController = require('../controllers/leadController');

router.post('/addLead',leadController.addLead);
router.get('/getLeads',leadController.getLeads);
router.get('/trackLead/:id',leadController.trackLead);

module.exports=router;