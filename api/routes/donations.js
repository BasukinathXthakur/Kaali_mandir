import express from 'express';
import Donation from '../../src/models/Donation.js';

const router = express.Router();

// Get all donations
router.get('/', async (req, res) => {
  try {
    const donations = await Donation.find().sort({ timestamp: -1 });
    res.json(donations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single donation
router.get('/:id', async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id);
    if (!donation) {
      return res.status(404).json({ message: 'Donation not found' });
    }
    res.json(donation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create donation
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, amount, purpose, paymentMethod, message, userId } = req.body;
    
    const newDonation = new Donation({
      name,
      email,
      phone,
      amount: Number(amount),
      purpose: purpose || 'General',
      paymentMethod,
      message,
      userId
    });
    
    const savedDonation = await newDonation.save();
    res.status(201).json(savedDonation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get total donations amount
router.get('/stats/total', async (req, res) => {
  try {
    const result = await Donation.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: '$amount' }
        }
      }
    ]);
    
    const totalAmount = result.length > 0 ? result[0].total : 0;
    res.json({ totalAmount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete donation (admin only)
router.delete('/:id', async (req, res) => {
  try {
    const deletedDonation = await Donation.findByIdAndDelete(req.params.id);
    
    if (!deletedDonation) {
      return res.status(404).json({ message: 'Donation not found' });
    }
    
    res.json({ message: 'Donation removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;