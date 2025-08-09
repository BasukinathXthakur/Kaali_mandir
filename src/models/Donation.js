import mongoose from 'mongoose';

const donationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String
  },
  phone: {
    type: String
  },
  amount: {
    type: Number,
    required: true
  },
  purpose: {
    type: String,
    default: 'General'
  },
  paymentMethod: {
    type: String
  },
  message: {
    type: String
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

const Donation = mongoose.model('Donation', donationSchema);

export default Donation;