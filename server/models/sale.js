import mongoose from 'mongoose';

const salesSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  

});

const Sale = mongoose.model('Sale', financeSchema);

export default Sale;