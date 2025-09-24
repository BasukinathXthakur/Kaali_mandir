import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./component/Navbar";
import Home from "./pages/Home";
import Events from "./pages/Events";
import Donations from "./pages/Donations";
import Auth from "./pages/Auth";
import Literature from "./pages/Literature";
import AartiDetail from "./pages/AartiDetail";
import PujaBooking from "./pages/PujaBooking";
import PrashadBooking from "./pages/PrashadBooking";
import Chhadava from "./pages/Chhadava";
import Gallery from "./pages/Gallery";
import Community from "./pages/Community";
import { AuthProvider } from "./contexts/AuthContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import PrivateRoute from "./component/PrivateRoute";
import AdminRoute from "./component/AdminRoute";
import Footer from "./component/Footer";

// Lazy load heavy components
const Mahabharat = React.lazy(() => import("./pages/Mahabharat"));
const Ramayana = React.lazy(() => import("./pages/Ramayana"));
const BhagavadGita = React.lazy(() => import("./pages/BhagavadGita"));
const AdminDashboard = React.lazy(() => import("./pages/Admin/Dashboard"));
const EventManagement = React.lazy(() =>
  import("./pages/Admin/EventManagement")
);
const DonationManagement = React.lazy(() =>
  import("./pages/Admin/DonationManagement")
);

function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <Router>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              <Suspense
                fallback={
                  <div className="flex items-center justify-center min-h-screen">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
                  </div>
                }
              >
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/pujas" element={<PujaBooking />} />
                  <Route path="/prashad" element={<PrashadBooking />} />
                  <Route path="/chhadava" element={<Chhadava />} />
                  <Route path="/gallery" element={<Gallery />} />
                  <Route path="/community" element={<Community />} />
                  <Route path="/events" element={<Events />} />
                  <Route path="/literature" element={<Literature />} />
                  <Route
                    path="/literature/mahabharat"
                    element={<Mahabharat />}
                  />
                  <Route path="/literature/ramayana" element={<Ramayana />} />
                  <Route
                    path="/literature/bhagavad-gita"
                    element={<BhagavadGita />}
                  />
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
              </Suspense>
            </main>
            <Footer />
          </div>
        </Router>
      </LanguageProvider>
    </AuthProvider>
  );
}

export default App;
