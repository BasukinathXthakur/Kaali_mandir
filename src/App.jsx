import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./component/Navbar";
import Home from "./pages/Home";
import Events from "./pages/Events";
import Donations from "./pages/Donations";
import Auth from "./pages/Auth";
import Literature from "./pages/Literature";
import AartiDetail from "./pages/AartiDetail";
import AdminDashboard from "./pages/Admin/Dashboard";
import EventManagement from "./pages/Admin/EventManagement";
import DonationManagement from "./pages/Admin/DonationManagement";
import { AuthProvider } from "./contexts/AuthContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import PrivateRoute from "./component/PrivateRoute";
import AdminRoute from "./component/AdminRoute";
import Footer from "./component/Footer";

function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <Router>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/events" element={<Events />} />
                <Route path="/literature" element={<Literature />} />
                <Route
                  path="/literature/:deitySlug"
                  element={<AartiDetail />}
                />
                <Route
                  path="/donations"
                  element={
                    <PrivateRoute>
                      <Donations />
                    </PrivateRoute>
                  }
                />
                <Route path="/login" element={<Auth />} />
                <Route
                  path="/admin"
                  element={
                    <AdminRoute>
                      <AdminDashboard />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/admin/events"
                  element={
                    <AdminRoute>
                      <EventManagement />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/admin/donations"
                  element={
                    <AdminRoute>
                      <DonationManagement />
                    </AdminRoute>
                  }
                />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </LanguageProvider>
    </AuthProvider>
  );
}

export default App;
