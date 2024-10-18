const Lead = require("../models/leadModel");
const EnviroLeadModel = require("../models/enviroLeadModel")


const addLead = async (req, res) => {
  try  {
    const leadData = req.body;
    if (!Array.isArray(leadData.leadGenratedThrough) || 
    !leadData.leadGenratedThrough.every(item => typeof item === 'string')) {
  return res.status(400).json({ status: false, message: "pass leadGenratedThrough as an array of strings" });
}
    const lead = new Lead(leadData);
    const datasave = await lead.save();
    return res.status(200).json(datasave);
  } catch (err) {
    return res.status(500).json({ status: false, message: err.message})
  }
    
};

  const addLeadForEnviroSolution = async (req, res) => {
    try {
      const data = req.body;
      const lead = await EnviroLeadModel.create(data)
      return res.status(201).json({ message: true, lead})
    } catch (err) {
      return res.status(500).json({ status: false, message: err.message})
    }
  };

  const getLeadForEnviroById = async (req, res) => {
    try {
      const {id} = req.params;
      const result = await EnviroLeadModel.findOne({ _id: id })
      return res.status(200).json(result);
    } catch (err) {
      return res.status(500).json({ status: false, message: err.message})
    }
  };

  const getLeadsForEnviro = async (req, res) => {
    try {
      const data = await EnviroLeadModel.find()
      return res.status(200).json(data);
    } catch (err) {
      return res.status(500).json({ status: false, message: err.message})
    }
  };

  const editLeadForEnviroById = async (req, res) => {
    try {
      const { id } = req.params;
      const data = req.body;

      const updateLead = await EnviroLeadModel.findByIdAndUpdate(id, data, { new: true });
      if (!updateLead) {
        return res.status(404).json({ message: "Lead not found" });
      }
      return res.status(200).json({ status: true, message: "lead updated successfully", updatedLead: updateLead });

    } catch (err) {
      return res.status(500).json({ status: false, message: err.message})
    }
  }
  
  const getLeads = async (req, res) => {
    const data = await Lead.find()
    res.status(200).json(data);
  };
  
  const getLeadById = async (req, res) => {
    const {id} = req.params;
    const result = await Lead.findOne({ _id: id })
    res.status(200).json(result);
  };

const editLeadById = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      nextCallObjective,
      discussionPoint,
      nextFollowUp,
      comments,
      status,
      address,
      organizationName,
      area,
      city,
      pincode,
      callObjective,
      targetDepartment,
      lastMeeting,
      requiredSupport,
      salesExpected,
      leadOwner,
      leadGenratedThrough,
    } = req.body;

    // Fields for direct updates
    const updateFields = {
      organizationName,
      address,
      area,
      city,
      pincode,
      callObjective,
      targetDepartment,
      lastMeeting,
      requiredSupport,
      salesExpected,
      leadOwner,
      leadGenratedThrough,
    };

    // Remove any undefined fields from updateFields
    Object.keys(updateFields).forEach((key) => {
      if (updateFields[key] === undefined) {
        delete updateFields[key];
      }
    });

    // Handle array updates conditionally
    const updateOperations = {
      $push: {},
    };

    if (nextCallObjective) {
      updateOperations.$push.nextCallObjective = nextCallObjective;
    }
    if (discussionPoint) {
      updateOperations.$push.discussionPoint = discussionPoint;
    }
    if (nextFollowUp) {
      updateOperations.$push.nextFollowUp = nextFollowUp;
    }
    if (comments) {
      updateOperations.$push.comments = comments;
    }
    if (status) {
      updateOperations.$push.status = status;
    }

    // If no $push fields are present, remove the $push key
    if (Object.keys(updateOperations.$push).length === 0) {
      delete updateOperations.$push;
    }

    // Merge updateOperations with updateFields for the final update object
    const finalUpdate = { ...updateOperations, ...updateFields };

    const data = await Lead.findByIdAndUpdate(id, finalUpdate, {
      new: true, // Return the updated document
    });

    if (!data) {
      return res.status(404).json({ message: "Lead not found" });
    }

    return res.status(200).json({ message: "Lead updated successfully", data });
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};



module.exports={
    addLead,
    getLeads,
    getLeadById,
    editLeadById,
    addLeadForEnviroSolution,
    getLeadForEnviroById,
    getLeadsForEnviro,
    editLeadForEnviroById,
}