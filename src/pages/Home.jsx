import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaHandHoldingHeart } from 'react-icons/fa';
import { db } from '../services/firebase';
import { collection, query, where, orderBy, limit, getDocs } from 'firebase/firestore';

const Home = () => {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nextEvent, setNextEvent] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Fetch upcoming events
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const eventsRef = collection(db, 'events');
        const q = query(
          eventsRef,
          where('date', '>=', today),
          orderBy('date', 'asc'),
          limit(4)
        );
        
        const querySnapshot = await getDocs(q);
        const events = [];
        
        querySnapshot.forEach((doc) => {
          events.push({
            id: doc.id,
            ...doc.data(),
            date: doc.data().date.toDate()
          });
        });
        
        setUpcomingEvents(events);
        if (events.length > 0) {
          setNextEvent(events[0]);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching events:', error);
        setLoading(false);
      }
    };
    
    fetchEvents();
  }, []);

  // Countdown timer for next event
  useEffect(() => {
    if (!nextEvent) return;
    
    const calculateTimeRemaining = () => {
      const now = new Date();
      const eventTime = nextEvent.date;
      const difference = eventTime - now;
      
      if (difference <= 0) {
        setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      
      setTimeRemaining({ days, hours, minutes, seconds });
    };
    
    calculateTimeRemaining();
    const timer = setInterval(calculateTimeRemaining, 1000);
    
    return () => clearInterval(timer);
  }, [nextEvent]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Banner */}
      <div className="relative bg-gray-900 text-white">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ backgroundImage: "url('/src/assets/temple-banner.jpg')" }}
        ></div>
        <div className="relative container mx-auto px-4 py-32 flex flex-col items-center justify-center text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to Kaali Mandir</h1>
          <p className="text-xl md:text-2xl mb-8">A sacred place for spiritual enlightenment and divine blessings</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              to="/events" 
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
            >
              Explore Events
            </Link>
            <Link 
              to="/donations" 
              className="bg-white hover:bg-gray-100 text-gray-900 font-bold py-3 px-6 rounded-lg transition-colors"
            >
              Make a Donation
            </Link>
          </div>
        </div>
      </div>

      {/* Next Event Countdown */}
      {nextEvent && (
        <div className="bg-orange-100 py-10">
          <div className="container mx-auto px-4">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Next Event: {nextEvent.name}</h2>
              <p className="text-gray-600">{new Date(nextEvent.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>
            <div className="flex justify-center">
              <div className="grid grid-cols-4 gap-4 text-center">
                <div className="bg-white p-4 rounded-lg shadow">
                  <div className="text-3xl font-bold text-orange-500">{timeRemaining.days}</div>
                  <div className="text-gray-600">Days</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                  <div className="text-3xl font-bold text-orange-500">{timeRemaining.hours}</div>
                  <div className="text-gray-600">Hours</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                  <div className="text-3xl font-bold text-orange-500">{timeRemaining.minutes}</div>
                  <div className="text-gray-600">Minutes</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                  <div className="text-3xl font-bold text-orange-500">{timeRemaining.seconds}</div>
                  <div className="text-gray-600">Seconds</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Upcoming Events Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Upcoming Events</h2>
            <p className="text-gray-600">Join us for these sacred ceremonies and celebrations</p>
          </div>
          
          {loading ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
            </div>
          ) : upcomingEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105">
                  <div className="h-48 bg-gray-200 relative">
                    {event.imageUrl ? (
                      <img src={event.imageUrl} alt={event.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-orange-100">
                        <FaCalendarAlt className="text-5xl text-orange-500" />
                      </div>
                    )}
                    <div className="absolute top-0 right-0 bg-orange-500 text-white py-1 px-3 rounded-bl-lg">
                      {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{event.name}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>
                    <Link 
                      to={`/events/${event.id}`} 
                      className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded transition-colors"
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-600">
              <p>No upcoming events at the moment. Please check back later.</p>
            </div>
          )}
          
          <div className="text-center mt-10">
            <Link 
              to="/events" 
              className="inline-block border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white font-bold py-2 px-6 rounded-lg transition-colors"
            >
              View All Events
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Donation Section */}
      <div className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <FaHandHoldingHeart className="text-5xl text-orange-500 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Support Our Temple</h2>
            <p className="text-gray-600 mb-8">
              Your generous donations help us maintain the temple, organize religious ceremonies, and serve the community.
              Every contribution, no matter how small, makes a difference.
            </p>
            <Link 
              to="/donations" 
              className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-lg transition-colors"
            >
              Donate Now
            </Link>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Our Services</h2>
            <p className="text-gray-600">We offer various religious and community services</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-orange-500">🙏</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Puja Services</h3>
              <p className="text-gray-600">
                We perform various pujas and rituals for different occasions and purposes.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-orange-500">🔥</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Hawan Ceremonies</h3>
              <p className="text-gray-600">
                Sacred fire ceremonies performed by our experienced priests for purification and blessings.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-orange-500">💍</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Wedding Ceremonies</h3>
              <p className="text-gray-600">
                Traditional Hindu wedding ceremonies conducted with all rituals and customs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;