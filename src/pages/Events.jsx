import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaRupeeSign,
} from "react-icons/fa";
import { getEvents } from "../../server/services/eventService";
import { useAuth } from "../contexts/AuthContext";
import { useLanguage } from "../contexts/LanguageContext";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("upcoming"); // 'upcoming', 'past', 'all'
  const { currentUser } = useAuth();
  const { t } = useLanguage();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getEvents(filter);
        setEvents(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching events:", error);
        setLoading(false);
      }
    };

    fetchEvents();
  }, [filter]);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setLoading(true);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="py-10 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            {t("events")}
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t("joinUsForSacredCeremonies")}
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-md shadow-sm" role="group">
            <button
              type="button"
              className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
                filter === "upcoming"
                  ? "bg-orange-500 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => handleFilterChange("upcoming")}
            >
              {t("upcomingEvents")}
            </button>
            <button
              type="button"
              className={`px-4 py-2 text-sm font-medium ${
                filter === "past"
                  ? "bg-orange-500 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => handleFilterChange("past")}
            >
              {t("pastEvents")}
            </button>
            <button
              type="button"
              className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
                filter === "all"
                  ? "bg-orange-500 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => handleFilterChange("all")}
            >
              {t("allEvents")}
            </button>
          </div>
        </div>

        {/* Events List */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
          </div>
        ) : events.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:shadow-lg"
              >
                <div className="h-48 bg-gray-200 relative">
                  {event.imageUrl ? (
                    <img
                      src={event.imageUrl}
                      alt={event.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-orange-100">
                      <FaCalendarAlt className="text-5xl text-orange-500" />
                    </div>
                  )}
                  <div className="absolute top-0 right-0 bg-orange-500 text-white py-1 px-3 rounded-bl-lg">
                    {new Date(event.date) < new Date()
                      ? t("pastEvent")
                      : t("upcoming")}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {event.name}
                  </h3>

                  <div className="flex items-center text-gray-600 mb-2">
                    <FaCalendarAlt className="mr-2 text-orange-500" />
                    <span>{formatDate(event.date)}</span>
                  </div>

                  <div className="flex items-center text-gray-600 mb-2">
                    <FaClock className="mr-2 text-orange-500" />
                    <span>{formatTime(event.date)}</span>
                  </div>

                  {event.location && (
                    <div className="flex items-center text-gray-600 mb-2">
                      <FaMapMarkerAlt className="mr-2 text-orange-500" />
                      <span>{event.location}</span>
                    </div>
                  )}

                  {event.price && (
                    <div className="flex items-center text-gray-600 mb-4">
                      <FaRupeeSign className="mr-2 text-orange-500" />
                      <span>
                        {typeof event.price === "number"
                          ? `₹${event.price}`
                          : event.price}
                      </span>
                    </div>
                  )}

                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {event.description}
                  </p>

                  <div className="flex justify-between items-center">
                    <Link
                      to={`/events/${event.id}`}
                      className="text-orange-500 hover:text-orange-600 font-medium"
                    >
                      {t("viewDetails")}
                    </Link>

                    {currentUser && new Date(event.date) > new Date() && (
                      <button
                        className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded transition-colors"
                        onClick={() =>
                          (window.location.href = `/events/${event.id}#booking`)
                        }
                      >
                        {t("bookNow")}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <FaCalendarAlt className="text-5xl text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              {filter === "upcoming"
                ? t("noUpcomingEventsFound")
                : filter === "past"
                ? t("noPastEventsFound")
                : t("noEventsFound")}
            </h3>
            <p className="text-gray-600">
              {filter === "upcoming"
                ? t("checkBackLater")
                : t("checkOtherCategories")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;
