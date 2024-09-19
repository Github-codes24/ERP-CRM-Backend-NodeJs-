import mongoose from 'mongoose';

const financeSchema = new mongoose.Schema({
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
  
  type: {
    type: String,
    enum: ['inflow', 'outflow'],
    required: true,
  },
});

const Finance = mongoose.model('Finance', financeSchema);

export default Finance;