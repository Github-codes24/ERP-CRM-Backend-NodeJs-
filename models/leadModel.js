const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema({
  organizationName: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  customerName: {
    type: String,
    required: true,
  },
  haveYouMeetBefore: {
    type: String,
  },
  dob: {
    type: String,
  },
  address: {
    type: String,
    required: true,
  },
  area: {
    type: String,
    required: true,
  },
  productPromoted: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  leadGenratedThrough: {
    type: [String],
    required: true,
  },
  pincode: {
    type: String,
    required: true,
  },
  callObjective: {
    type: String,
    required: true,
  },
  nextCallObjective: {
    type: [String],
    required: true,
  },
  targetDepartment: {
    type: String,
  },
  discussionPoint: {
    type: [String],
    required: true,
  },
  lastMeeting: {
    type: String,
    required: true,
  },
  nextFollowUp: {
    type: [String],
    required: true,
  },
  requiredSupport: {
    type: String,
    required: true,
  },
  comments: {
    type: [String],
    required: true,
  },
  salesExpected: {
    type: String,
    required: true,
  },

  status: {
    type: [String],
    required: true,
  },
  leadOwner: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
});

const lead = mongoose.model("lead", leadSchema);

module.exports = lead;
