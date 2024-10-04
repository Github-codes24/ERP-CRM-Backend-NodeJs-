const  mongoose =  require('mongoose');

const salesSchema = new mongoose.Schema({
  employeeFirstName: { type: String, required: true },
  employeeLastName: { type: String, required: true },
  productName: { type: String, required: true },
  date: { type: String, required: true },
  organizationName: { type: String, required: true },
  email: { type: String, required: true },
  contact: { type: String, required: true },
  region: { type: String, required: true },
  state: { type: String, required: true },
  district: { type: String, required: true },
  billAmount: { type: String, required: true },
  paidAmount: { type: String, required: true },
  unclearedAmount: { type: String, required: true },
  noOfProductsSold: { type: String, required: true },
  billStatus: { type: String, required: true }
},{ timestamps: true });
const Sale = mongoose.model('Sale', salesSchema);

module.exports = Sale;