const mongoose = require('mongoose');


// Define the schema for Organization Names (Workplace 1 and Workplace 2)
const workplaceSchema = new mongoose.Schema({
  workplaceName: { type: String, required: true },
  address: { type: String, required: true },
  region: { type: String, required: true },
  state: { type: String, required: true },
  district: { type: String, required: true },
  pincode: { type: String, required: true },
  totalBeds: { type: String, required: true },
  totalICU: { type: String, required: true },
  totalOperationTheater: { type: String, required: true },
  totalNoOfMIS: { type: String, required: true }
});

// Define the schema for AddHod object
const hodSchema = new mongoose.Schema({
  hodName: { type: String, required: true },
  hodDepartment: { type: String, required: true },
  totalNoOfMISPerformed: { type: Number, required: true },
  leadManagement: { type: String, required: true },
  contactNo: { type: String, required: true },
  alternateNo: { type: String },
  birthDate: { type: Date },
  database: { type: String },
  email: { type: String, required: true },
  personalEmail: { type: String },
  anniversaryDate: { type: Date },
  typeOfSurgeryPerformed: { type: String },
  speciality: { type: String },
  hobbies: { type: String },
  comments: { type: String },
  preferredMeetingDay: { type: String },
  preferredMeetingTime: { type: String },
  address: { type: String },
  landmark: { type: String },
  pinCode: { type: String },
  whatDoYouBelieve: { type: [String] }
});

// Define the schema for Other object
const otherSchema = new mongoose.Schema({
  name: { type: String, required: true },
  designation: { type: String, required: true },
  department: { type: String, required: true },
  leadManagement: { type: String, required: true },
  contactNo: { type: String, required: true },
  alternateNo: { type: String },
  birthDate: { type: Date },
  database: { type: String },
  email: { type: String, required: true },
  personalEmail: { type: String },
  anniversaryDate: { type: Date },
  typeOfSurgeryPerformed: { type: String },
  speciality: { type: String },
  hobbies: { type: String },
  comments: { type: String },
  preferredMeetingDay: { type: String },
  preferredMeetingTime: { type: String },
  address: { type: String },
  landmark: { type: String },
  pinCode: { type: String },
  whatDoYouBelieve: { type: [String] }
});

const customerSchema = new mongoose.Schema({
  workplace1: { type: workplaceSchema, required: true },
  workplace2: { type: workplaceSchema, required: true },
  addHod: { type: hodSchema, required: true },
  other: { type: otherSchema, required: true },
  quotationInTheNameDesignation: { type: String, required: true },
  salesPersonName: { type: String, required: true }
}, { timestamps: true });
    
const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;