const mongoose = require('mongoose');
const customerSchema = new mongoose.Schema({
    workplaceName: { type: String, required: true },
    address: { type: String, required: true },
    region: { type: String, required: true },
    state: { type: String, required: true },
    district: { type: String, required: true },
    pincode: { type: String, required: true },
    totalICU: { type: String, required: true }, 
    totalOperationTheater: { type: String, required: true },
    totalNumberOfMis: { type: String, required: true },
    quotationInTheName: { type: String, required: true },
    designation: { type: String, required: true },
    salesPersonName: { type: String, required: true }
  }, { timestamps: true })
    

const customer = mongoose.model('Customer',customerSchema);

module.exports = customer;