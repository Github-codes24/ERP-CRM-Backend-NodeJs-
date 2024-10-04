const  mongoose =  require('mongoose');

const superAdminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
}, {timestamps: true});

const SuperAdminModel = mongoose.model('superAdmin', superAdminSchema);

module.exports= SuperAdminModel;
