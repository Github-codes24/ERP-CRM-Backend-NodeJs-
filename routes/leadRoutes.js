const express = require('express');
const router = express.Router();
const leadController = require('../controllers/leadController');

router.post('/addLead',leadController.addLead);
router.get('/getLeads',leadController.getLeads);
router.get('/getLeadById/:id',leadController.getLeadById);

module.exports=router;