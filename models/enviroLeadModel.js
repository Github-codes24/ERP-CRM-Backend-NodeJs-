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
  lastMeeting: {
    type: String,
  },
  nextMeeting: {
    type: String,
  },
  status: {
    type: String,
  },
  panNo: {
    type: String,
  },
  sprayingType: {
    type: String,
  },
  tentativeBuyingDate: {
    type: String,
  },
  cropType: {
    type: String,
  },
  cropName: {
    type: String,
  },
  sprayingDuration: {
    type: String,
  },
  customerType: {
    type: String,
  },
  department: {
    type: String,
  },
  taluka: {
    type: String,
  },
  purposeForBuying: {
    type: String,
  },
  paymentMode: {
    type: String,
  },
  existingLoan: {
    type: String,
  },
  bankName: {
    type: String,
  },
});

const EnviroLeadModel = mongoose.model("enviroLead", leadSchema);

module.exports = EnviroLeadModel;
