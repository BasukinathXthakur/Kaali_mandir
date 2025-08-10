import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaPlus, FaEdit, FaTrash, FaCalendarAlt, FaClock, FaMapMarkerAlt, FaRupeeSign } from 'react-icons/fa';
import { db } from '../../services/firebase';
import axios from 'axios';

const API_URL = 'https://localhost:5000/events'; // Replace with your API URL

const EventManagement = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentEventId, setCurrentEventId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    date: '',
    time: '',
    location: '',
    price: '',
    capacity: '',
    image: ''
  });
  const [formError, setFormError] = useState('');

  // Fetch events
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await axios.get(API_URL);
      setEvents(res.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching events:', error);
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      date: '',
      time: '',
      location: '',
      price: '',
      capacity: '',
      image: ''
    });
    setFormError('');
    setIsEditing(false);
    setCurrentEventId(null);
  };

  const handleOpenModal = (event = null) => {
    resetForm();
    
    if (event) {
      // Edit mode
      setIsEditing(true);
      setCurrentEventId(event.id);
      
      // Format date for input field
      const formattedDate = event.date instanceof Date 
        ? event.date.toISOString().split('T')[0] 
        : '';
      
      setFormData({
        name: event.name || '',
        description: event.description || '',
        date: formattedDate,
        time: event.time || '',
        location: event.location || '',
        price: event.price || '',
        capacity: event.capacity || '',
        image: event.image || ''
      });
    }
    
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    if (!formData.name || !formData.date) {
      setFormError('Event name and date are required');
      return;
    }
    try {
      const eventData = {
        ...formData,
        date: new Date(formData.date),
        price: Number(formData.price) || 0,
        capacity: Number(formData.capacity) || 0,
      };
      if (isEditing && currentEventId) {
        await axios.put(`${API_URL}/${currentEventId}`, eventData);
      } else {
        await axios.post(API_URL, eventData);
      }
      handleCloseModal();
      fetchEvents();
    } catch (error) {
      console.error('Error saving event:', error);
      setFormError('Failed to save event. Please try again.');
    }
  };

  const handleDeleteEvent = async (eventId) => {
    if (!window.confirm('Are you sure you want to delete this event?')) return;
    try {
      await axios.delete(`${API_URL}/${eventId}`);
      fetchEvents();
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  const formatDate = (date) => {
    return date instanceof Date 
      ? date.toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })
      : 'Invalid date';
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="text-xl">Loading events...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Event Management</h1>
        <button
          onClick={() => handleOpenModal()}
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md flex items-center"
        >
          <FaPlus className="mr-2" /> Add New Event
        </button>
      </div>

      {events.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <p className="text-gray-500">No events found. Create your first event!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {events.map((event) => (
            <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <h2 className="text-xl font-semibold mb-2">{event.name}</h2>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleOpenModal(event)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <FaEdit size={18} />
                    </button>
                    <button
                      onClick={() => handleDeleteEvent(event.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrash size={18} />
                    </button>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-4">{event.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center text-gray-600">
                    <FaCalendarAlt className="mr-2 text-orange-500" />
                    {formatDate(event.date)}
                  </div>
                  
                  {event.time && (
                    <div className="flex items-center text-gray-600">
                      <FaClock className="mr-2 text-orange-500" />
                      {event.time}
                    </div>
                  )}
                  
                  {event.location && (
                    <div className="flex items-center text-gray-600">
                      <FaMapMarkerAlt className="mr-2 text-orange-500" />
                      {event.location}
                    </div>
                  )}
                  
                  {event.price > 0 && (
                    <div className="flex items-center text-gray-600">
                      <FaRupeeSign className="mr-2 text-orange-500" />
                      {event.price}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Event Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-2xl mx-4">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">
                {isEditing ? 'Edit Event' : 'Add New Event'}
              </h2>
              
              {formError && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                  {formError}
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-gray-700 mb-2">Event Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-2">Date *</label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-2">Time</label>
                    <input
                      type="time"
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-2">Location</label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-2">Price (₹)</label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      min="0"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-2">Capacity</label>
                    <input
                      type="number"
                      name="capacity"
                      value={formData.capacity}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      min="0"
                    />
                  </div>
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    rows="4"
                  ></textarea>
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Image URL</label>
                  <input
                    type="text"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
                
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
                  >
                    {isEditing ? 'Update Event' : 'Create Event'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventManagement;