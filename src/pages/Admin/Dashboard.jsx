import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaCalendarAlt,
  FaRupeeSign,
  FaUsers,
  FaChartLine,
} from "react-icons/fa";
import { db } from "../../../server/services/firebase";
import {
  collection,
  query,
  orderBy,
  limit,
  getDocs,
  where,
} from "firebase/firestore";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalEvents: 0,
    upcomingEvents: 0,
    totalDonations: 0,
    totalUsers: 0,
  });
  const [recentDonations, setRecentDonations] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Execute all queries in parallel for better performance
        const [
          eventsSnapshot,
          upcomingEventsSnapshot,
          upcomingEventsListSnapshot,
          donationsSnapshot,
          recentDonationsSnapshot,
          usersSnapshot,
        ] = await Promise.all([
          // All events
          getDocs(collection(db, "events")),
          // Upcoming events count
          getDocs(query(collection(db, "events"), where("date", ">=", today))),
          // Upcoming events list
          getDocs(
            query(
              collection(db, "events"),
              where("date", ">=", today),
              orderBy("date", "asc"),
              limit(5)
            )
          ),
          // All donations
          getDocs(collection(db, "donations")),
          // Recent donations
          getDocs(
            query(
              collection(db, "donations"),
              orderBy("timestamp", "desc"),
              limit(5)
            )
          ),
          // All users
          getDocs(collection(db, "users")),
        ]);

        // Process events data
        const totalEvents = eventsSnapshot.size;
        const upcomingEventsCount = upcomingEventsSnapshot.size;

        const upcomingEventsList = [];
        upcomingEventsListSnapshot.forEach((doc) => {
          upcomingEventsList.push({
            id: doc.id,
            ...doc.data(),
            date: doc.data().date.toDate(),
          });
        });

        // Process donations data
        let totalDonationAmount = 0;
        donationsSnapshot.forEach((doc) => {
          totalDonationAmount += Number(doc.data().amount);
        });

        const recentDonationsList = [];
        recentDonationsSnapshot.forEach((doc) => {
          recentDonationsList.push({
            id: doc.id,
            ...doc.data(),
            timestamp: doc.data().timestamp?.toDate() || new Date(),
          });
        });

        // Process users data
        const totalUsers = usersSnapshot.size;

        // Update state
        setStats({
          totalEvents,
          upcomingEvents: upcomingEventsCount,
          totalDonations: totalDonationAmount,
          totalUsers,
        });
        setUpcomingEvents(upcomingEventsList);
        setRecentDonations(recentDonationsList);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setError("Failed to load dashboard data. Please try again.");
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="py-10 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Admin Dashboard
        </h1>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
          </div>
        ) : error ? (
          <div className="flex justify-center py-20">
            <div className="text-center">
              <div className="text-red-500 text-xl mb-4">⚠️</div>
              <p className="text-red-600 mb-4">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
              >
                Retry
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-orange-100 text-orange-500 mr-4">
                    <FaCalendarAlt className="text-2xl" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Total Events</p>
                    <h3 className="text-2xl font-bold text-gray-800">
                      {stats.totalEvents}
                    </h3>
                  </div>
                </div>
                <div className="mt-4">
                  <Link
                    to="/admin/events"
                    className="text-orange-500 hover:text-orange-600 text-sm font-medium"
                  >
                    View all events →
                  </Link>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-green-100 text-green-500 mr-4">
                    <FaCalendarAlt className="text-2xl" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Upcoming Events</p>
                    <h3 className="text-2xl font-bold text-gray-800">
                      {stats.upcomingEvents}
                    </h3>
                  </div>
                </div>
                <div className="mt-4">
                  <Link
                    to="/admin/events"
                    className="text-green-500 hover:text-green-600 text-sm font-medium"
                  >
                    Manage events →
                  </Link>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-blue-100 text-blue-500 mr-4">
                    <FaRupeeSign className="text-2xl" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Total Donations</p>
                    <h3 className="text-2xl font-bold text-gray-800">
                      ₹{stats.totalDonations.toLocaleString()}
                    </h3>
                  </div>
                </div>
                <div className="mt-4">
                  <Link
                    to="/admin/donations"
                    className="text-blue-500 hover:text-blue-600 text-sm font-medium"
                  >
                    View donations →
                  </Link>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-purple-100 text-purple-500 mr-4">
                    <FaUsers className="text-2xl" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Total Users</p>
                    <h3 className="text-2xl font-bold text-gray-800">
                      {stats.totalUsers}
                    </h3>
                  </div>
                </div>
                <div className="mt-4">
                  <span className="text-purple-500 text-sm font-medium">
                    Registered users
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Upcoming Events */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-800">
                    Upcoming Events
                  </h2>
                  <Link
                    to="/admin/events"
                    className="text-orange-500 hover:text-orange-600 text-sm font-medium"
                  >
                    View All
                  </Link>
                </div>

                {upcomingEvents.length > 0 ? (
                  <div className="space-y-4">
                    {upcomingEvents.map((event) => (
                      <div
                        key={event.id}
                        className="flex items-center p-3 border border-gray-100 rounded-lg hover:bg-gray-50"
                      >
                        <div className="p-2 rounded-md bg-orange-100 text-orange-500 mr-4">
                          <FaCalendarAlt />
                        </div>
                        <div className="flex-grow">
                          <h3 className="text-gray-800 font-medium">
                            {event.name}
                          </h3>
                          <p className="text-gray-500 text-sm">
                            {formatDate(event.date)}
                          </p>
                        </div>
                        <Link
                          to={`/admin/events?edit=${event.id}`}
                          className="text-blue-500 hover:text-blue-600 text-sm"
                        >
                          Edit
                        </Link>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    No upcoming events scheduled
                  </div>
                )}
              </div>

              {/* Recent Donations */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-800">
                    Recent Donations
                  </h2>
                  <Link
                    to="/admin/donations"
                    className="text-orange-500 hover:text-orange-600 text-sm font-medium"
                  >
                    View All
                  </Link>
                </div>

                {recentDonations.length > 0 ? (
                  <div className="space-y-4">
                    {recentDonations.map((donation) => (
                      <div
                        key={donation.id}
                        className="flex items-center p-3 border border-gray-100 rounded-lg hover:bg-gray-50"
                      >
                        <div className="p-2 rounded-md bg-green-100 text-green-500 mr-4">
                          <FaRupeeSign />
                        </div>
                        <div className="flex-grow">
                          <h3 className="text-gray-800 font-medium">
                            {donation.name}
                          </h3>
                          <p className="text-gray-500 text-sm">
                            {formatDate(donation.timestamp)}
                          </p>
                        </div>
                        <div className="text-green-600 font-semibold">
                          ₹{donation.amount.toLocaleString()}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    No donations received yet
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
