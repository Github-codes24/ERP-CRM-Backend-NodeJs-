const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  address : {
    type : String,
  },
  industry : {
    type : String
  },
  founded : {
    type : String,
  },
  employees : {
    type : Number,
  },
  website : {
    type : String,
  },
});

const CompanyModel = mongoose.model('Company', companySchema);

module.exports = CompanyModel;