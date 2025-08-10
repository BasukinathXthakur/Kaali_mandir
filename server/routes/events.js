import express from 'express';
import Event from '../../src/models/Event.js';

const router = express.Router();

// Get all events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single event
router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json(event);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create event
router.post('/', async (req, res) => {
  try {
    const { name, description, date, time, location, price, capacity, image } = req.body;
    
    const newEvent = new Event({
      name,
      description,
      date: new Date(date),
      time,
      location,
      price: Number(price) || 0,
      capacity: Number(capacity) || 0,
      image
    });
    
    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update event
router.put('/:id', async (req, res) => {
  try {
    const { name, description, date, time, location, price, capacity, image } = req.body;
    
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      {
        name,
        description,
        date: new Date(date),
        time,
        location,
        price: Number(price) || 0,
        capacity: Number(capacity) || 0,
        image,
        updatedAt: Date.now()
      },
      { new: true }
    );
    
    if (!updatedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }
    
    res.json(updatedEvent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete event
router.delete('/:id', async (req, res) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);
    
    if (!deletedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }
    
    res.json({ message: 'Event removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;