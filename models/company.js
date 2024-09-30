const  mongoose =  require('mongoose');

const companySchema = new mongoose.Schema({
  date: { type: String, required: true },
  leadName: { type: String, required: true },
  companyName: { type: String, required: true },
  email: { type: String, required: true, match: /.+\@.+\..+/ },
  contactNo: { type: String, required: true, match: /^[0-9]+$/ } 
}, { timestamps: true });

const Company = mongoose.model('Company', companySchema);
 

module.exports = Company;
