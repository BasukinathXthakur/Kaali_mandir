import React, { useState, useEffect } from "react";
import {
  FaRupeeSign,
  FaUser,
  FaPhone,
  FaEnvelope,
  FaCalendarAlt,
  FaSearch,
  FaDownload,
} from "react-icons/fa";
import { db } from "../../../server/services/firebase";
import { collection, query, orderBy, getDocs, where } from "firebase/firestore";

const DonationManagement = () => {
  const [donations, setDonations] = useState([]);
  const [filteredDonations, setFilteredDonations] = useState([]);
  const [totalDonations, setTotalDonations] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("all"); // 'all', 'today', 'week', 'month', 'year'
  const [sortBy, setSortBy] = useState("date-desc"); // 'date-desc', 'date-asc', 'amount-desc', 'amount-asc'

  // Fetch donations
  useEffect(() => {
    fetchDonations();
  }, []);

  const fetchDonations = async () => {
    try {
      const donationsRef = collection(db, "donations");
      const q = query(donationsRef, orderBy("timestamp", "desc"));
      const querySnapshot = await getDocs(q);

      const donationsList = [];
      let total = 0;

      querySnapshot.forEach((doc) => {
        const donation = {
          id: doc.id,
          ...doc.data(),
          timestamp: doc.data().timestamp?.toDate() || new Date(),
        };
        donationsList.push(donation);
        total += Number(donation.amount);
      });

      setDonations(donationsList);
      setFilteredDonations(donationsList);
      setTotalDonations(total);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching donations:", error);
      setLoading(false);
    }
  };

  // Apply filters and search
  useEffect(() => {
    let result = [...donations];

    // Apply date filter
    if (dateFilter !== "all") {
      const now = new Date();
      let filterDate = new Date();

      if (dateFilter === "today") {
        filterDate.setHours(0, 0, 0, 0);
      } else if (dateFilter === "week") {
        filterDate.setDate(now.getDate() - 7);
      } else if (dateFilter === "month") {
        filterDate.setMonth(now.getMonth() - 1);
      } else if (dateFilter === "year") {
        filterDate.setFullYear(now.getFullYear() - 1);
      }

      result = result.filter((donation) => donation.timestamp >= filterDate);
    }

    // Apply search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (donation) =>
          donation.name?.toLowerCase().includes(term) ||
          donation.email?.toLowerCase().includes(term) ||
          donation.phone?.includes(term) ||
          donation.purpose?.toLowerCase().includes(term)
      );
    }

    // Apply sorting
    if (sortBy === "date-desc") {
      result.sort((a, b) => b.timestamp - a.timestamp);
    } else if (sortBy === "date-asc") {
      result.sort((a, b) => a.timestamp - b.timestamp);
    } else if (sortBy === "amount-desc") {
      result.sort((a, b) => Number(b.amount) - Number(a.amount));
    } else if (sortBy === "amount-asc") {
      result.sort((a, b) => Number(a.amount) - Number(b.amount));
    }

    setFilteredDonations(result);

    // Calculate total of filtered donations
    const filteredTotal = result.reduce(
      (sum, donation) => sum + Number(donation.amount),
      0
    );
    setTotalDonations(filteredTotal);
  }, [donations, searchTerm, dateFilter, sortBy]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDateFilterChange = (e) => {
    setDateFilter(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const formatDate = (date) => {
    return date instanceof Date
      ? date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : "Invalid date";
  };

  const exportToCSV = () => {
    const headers = [
      "Name",
      "Email",
      "Phone",
      "Amount",
      "Purpose",
      "Payment Method",
      "Date",
      "Message",
    ];

    const csvData = filteredDonations.map((donation) => [
      donation.name,
      donation.email,
      donation.phone,
      donation.amount,
      donation.purpose,
      donation.paymentMethod,
      formatDate(donation.timestamp),
      donation.message,
    ]);

    const csvContent = [
      headers.join(","),
      ...csvData.map((row) => row.map((cell) => `"${cell || ""}"`).join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `donations_${new Date().toISOString().split("T")[0]}.csv`
    );
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="text-xl">Loading donations...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-2xl font-bold mb-4 md:mb-0">Donation Management</h1>

        <div className="bg-orange-100 rounded-lg p-4 text-center">
          <p className="text-sm text-orange-800">Total Donations</p>
          <p className="text-2xl font-bold text-orange-600">
            <FaRupeeSign className="inline-block mr-1" />
            {totalDonations.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-gray-700 mb-2">Search</label>
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search by name, email, phone..."
                className="w-full border border-gray-300 rounded-md pl-10 pr-3 py-2"
              />
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Date Range</label>
            <select
              value={dateFilter}
              onChange={handleDateFilterChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">Last 7 Days</option>
              <option value="month">Last 30 Days</option>
              <option value="year">Last Year</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Sort By</label>
            <select
              value={sortBy}
              onChange={handleSortChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            >
              <option value="date-desc">Date (Newest First)</option>
              <option value="date-asc">Date (Oldest First)</option>
              <option value="amount-desc">Amount (Highest First)</option>
              <option value="amount-asc">Amount (Lowest First)</option>
            </select>
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          <button
            onClick={exportToCSV}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md flex items-center"
          >
            <FaDownload className="mr-2" /> Export to CSV
          </button>
        </div>
      </div>

      {/* Donations List */}
      {filteredDonations.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <p className="text-gray-500">
            No donations found matching your criteria.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Donor
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Purpose
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Payment Method
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredDonations.map((donation) => (
                  <tr key={donation.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-medium">{donation.name}</span>
                        <div className="flex flex-col text-sm text-gray-500">
                          {donation.email && (
                            <span className="flex items-center">
                              <FaEnvelope className="mr-1" size={12} />
                              {donation.email}
                            </span>
                          )}
                          {donation.phone && (
                            <span className="flex items-center">
                              <FaPhone className="mr-1" size={12} />
                              {donation.phone}
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-green-600 font-medium flex items-center">
                        <FaRupeeSign className="mr-1" />
                        {Number(donation.amount).toLocaleString()}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="capitalize">
                        {donation.purpose || "General"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="capitalize">
                        {donation.paymentMethod || "N/A"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <FaCalendarAlt className="mr-2 text-gray-400" />
                        {formatDate(donation.timestamp)}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonationManagement;
