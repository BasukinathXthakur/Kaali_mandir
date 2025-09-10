import React, { useState, useEffect } from 'react';
import { FaRupeeSign, FaUser, FaPhone, FaEnvelope, FaCheckCircle, FaAddressBook } from 'react-icons/fa';
import { db } from '../services/firebase';
import { collection, addDoc, query, orderBy, getDocs, serverTimestamp } from 'firebase/firestore';
import { useAuth } from '../contexts/AuthContext';

const Donations = () => {
  const { currentUser } = useAuth();
  const [donations, setDonations] = useState([]);
  const [totalDonations, setTotalDonations] = useState(0);
  const [loading, setLoading] = useState(true);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    amount: '',
    paymentMethod: 'upi',
    purpose: 'general',
    message: ''
  });

  // Fetch donations
  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const donationsRef = collection(db, 'donations');
        const q = query(donationsRef, orderBy('timestamp', 'desc'));
        const querySnapshot = await getDocs(q);
        
        const donationsList = [];
        let total = 0;
        
        querySnapshot.forEach((doc) => {
          const donation = {
            id: doc.id,
            ...doc.data(),
            timestamp: doc.data().timestamp?.toDate() || new Date()
          };
          donationsList.push(donation);
          total += Number(donation.amount);
        });
        
        setDonations(donationsList);
        setTotalDonations(total);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching donations:', error);
        setLoading(false);
      }
    };
    
    fetchDonations();
  }, [formSubmitted]);

  // Pre-fill form with user data if available
  useEffect(() => {
    if (currentUser) {
      setFormData(prev => ({
        ...prev,
        name: currentUser.displayName || '',
        email: currentUser.email || ''
      }));
    }
  }, [currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Add donation to Firestore
      await addDoc(collection(db, 'donations'), {
        userId: currentUser.uid,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        amount: Number(formData.amount),
        paymentMethod: formData.paymentMethod,
        purpose: formData.purpose,
        message: formData.message,
        timestamp: serverTimestamp(),
        status: 'completed' // In a real app, this would be 'pending' until payment confirmation
      });
      
      // Reset form
      setFormData({
        name: currentUser?.displayName || '',
        email: currentUser?.email || '',
        phone: '',
        amount: '',
        paymentMethod: 'upi',
        purpose: 'general',
        message: ''
      });
      
      setFormSubmitted(true);
      
      // Reset form submitted state after 5 seconds
      setTimeout(() => {
        setFormSubmitted(false);
      }, 5000);
      
    } catch (error) {
      console.error('Error adding donation:', error);
      alert('Failed to process donation. Please try again.');
    }
  };

  return (
    <div className="py-10 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Support Our Temple</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Your generous donations help us maintain the temple, organize religious ceremonies, and serve the community.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Donation Form */}
          <div className="lg:w-1/2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Make a Donation</h2>
              
              {formSubmitted ? (
                <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-6">
                  <div className="flex items-center">
                    <FaCheckCircle className="text-green-500 mr-3 text-xl" />
                    <div>
                      <h3 className="text-green-800 font-medium">Donation Successful!</h3>
                      <p className="text-green-700 mt-1">Thank you for your generous contribution.</p>
                    </div>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label htmlFor="name" className="block text-gray-700 font-medium mb-1">Full Name</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FaUser className="text-gray-400" />
                        </div>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                          placeholder="Your Name"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-gray-700 font-medium mb-1">Phone Number</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FaPhone className="text-gray-400" />
                        </div>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                          placeholder="Your Phone"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 font-medium mb-1">Email Address</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaEnvelope className="text-gray-400" />
                      </div>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                        placeholder="Your Email"
                        required
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 font-medium mb-1">Father name</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaUser className="text-gray-400" />
                      </div>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.fatherName}
                        onChange={handleChange}
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                        placeholder="Father Name"
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 font-medium mb-1">Address</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaAddressBook className="text-gray-400" />
                      </div>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                        placeholder="Enter Village Name"
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="amount" className="block text-gray-700 font-medium mb-1">Donation Amount (₹)</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaRupeeSign className="text-gray-400" />
                      </div>
                      <input
                        type="number"
                        id="amount"
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                        placeholder="Amount"
                        min="1"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label htmlFor="paymentMethod" className="block text-gray-700 font-medium mb-1">Payment Method</label>
                      <select
                        id="paymentMethod"
                        name="paymentMethod"
                        value={formData.paymentMethod}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                        required
                      >
                        <option value="upi">UPI</option>
                        <option value="card">Credit/Debit Card</option>
                        <option value="netbanking">Net Banking</option>
                        <option value="wallet">Cash</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="purpose" className="block text-gray-700 font-medium mb-1">Donation Purpose</label>
                      <select
                        id="purpose"
                        name="purpose"
                        value={formData.purpose}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                        required
                      >
                        <option value="general">General Donation</option>
                        <option value="puja">Puja chanda</option>
                        <option value="construction">Temple Construction</option>
                        <option value="charity">Charity & Community Service</option>
                        <option value="festival">Festival Celebration</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="message" className="block text-gray-700 font-medium mb-1">Message (Optional)</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="Your message or prayer request"
                      rows="3"
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-md transition-colors"
                  >
                    Donate Now
                  </button>
                </form>
              )}
            </div>
          </div>
          
          {/* Donations List */}
          <div className="lg:w-1/2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-800">Recent Donations</h2>
                <div className="bg-orange-100 text-orange-800 font-medium py-2 px-4 rounded-md">
                  Total: ₹{totalDonations.toLocaleString()}
                </div>
              </div>
              
              {loading ? (
                <div className="flex justify-center py-10">
                  <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-orange-500"></div>
                </div>
              ) : donations.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Donor
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Amount
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Purpose
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {donations.map((donation) => (
                        <tr key={donation.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{donation.name}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">₹{donation.amount.toLocaleString()}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              {donation.purpose.charAt(0).toUpperCase() + donation.purpose.slice(1)}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {donation.timestamp.toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-10">
                  <FaRupeeSign className="text-4xl text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600">No donations yet. Be the first to contribute!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Donations;