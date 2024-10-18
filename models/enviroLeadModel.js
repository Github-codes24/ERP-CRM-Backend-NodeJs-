const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  leadOwner: {
    type: String,
    required: true,
  },
  productName: {
    type: String,
  },
  totalLandOwned: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  contact: {
    type: String,
  },
  villageName: {
    type: String,
  },
  state: {
    type: String,
  },
  district: {
    type: String,
  },
  address: {
    type: String,
  },
  pinCode: {
    type: String,
  },
  leadGeneratedThrough: {
    type: String,
  },
});

const EnviroLeadModel = mongoose.model("enviroLead", leadSchema);

module.exports = EnviroLeadModel;
