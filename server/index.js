import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "../server/services/mongodb.js";
dotenv.config();
// Import routes
import authRoutes from "./routes/auth.js";
import eventRoutes from "./routes/events.js";
import donationRoutes from "./routes/donations.js";
import prashadRoutes from "./routes/prashad.js";
import communityRoutes from "./routes/community.js";
import galleryRoutes from "./routes/gallery.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from uploads directory
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/donations", donationRoutes);
app.use("/api/prashad", prashadRoutes);
app.use("/api/community", communityRoutes);
app.use("/api/gallery", galleryRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});
