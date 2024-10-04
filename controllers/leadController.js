const Lead = require("../models/leadModel");


const addLead = async (req, res) => {
    const leadData = req.body;
    const lead = new Lead(leadData);
    const datasave = await lead.save();
    res.status(200).json(datasave);
  };
  
  const getLeads = async (req, res) => {
    const data = await Lead.find()
    res.status(200).json(data);
  };
  
  const getLeadById = async (req, res) => {
    const id = req.params.id;
    const result = await Lead.findById({ id })
    res.status(200).json(result);
  };

module.exports={
    addLead,
    getLeads,
    getLeadById
}