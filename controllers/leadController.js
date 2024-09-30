const Lead = require("../models/leadModel");


const addLead = async (req, res) => {
    const leadData = req.body;
    const lead = new Lead(leadData);
    const datasave = await lead.save();
    res.status(200).json(datasave);
  };
  
  const getLeads = async (req, res) => {
    const data = await Lead.find({}).select(
      "organizationName lastMeeting nextFollowUp targetDepartment leadOwner"
    );
    res.status(200).json(data);
  };
  
  const trackLead = async (req, res) => {
    const id = req.params.id;
    const result = await Lead.findById({ _id: id }).select(
      "organizationName lastMeeting nextFollowUp status salesExpected category"
    );
    res.status(200).json(result);
  };

module.exports={
    addLead,
    getLeads,
    trackLead
}