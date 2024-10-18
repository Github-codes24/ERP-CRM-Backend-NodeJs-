const express = require('express');
const router = express.Router();
const leadController = require('../controllers/leadController');

router.post('/addLead',leadController.addLead);
router.get('/getLeads',leadController.getLeads);
router.get('/getLeadById/:id',leadController.getLeadById);
router.put('/editLeadById/:id',leadController.editLeadById);

// routes for enviro solutions
router.post('/addLeadForEnviro',leadController.addLeadForEnviroSolution);
router.get('/getLeadForEnviroById/:id',leadController.getLeadForEnviroById);
router.get('/getLeadsForEnviro',leadController.getLeadsForEnviro);
router.put('/editLeadForEnviroById/:id',leadController.editLeadForEnviroById);

module.exports=router;