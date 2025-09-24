import express from "express";
import serverless from "serverless-http";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./services/mongodb.js";
dotenv.config(
  {
    path: path.resolve(process.cwd(), ".env"),
  }
);
// Import routes
import authRoutes from "./routes/auth.js";
import eventRoutes from "./routes/events.js";
import donationRoutes from "./routes/donations.js";
import prashadRoutes from "./routes/prashad.js";
import communityRoutes from "./routes/community.js";
import galleryRoutes from "./routes/gallery.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Connect to MongoDB
connectDB();

// CORS configuration to allow frontend domain
const allowedOrigins = [
  'https://kaali-mandir.onrender.com',
  'http://localhost:3000', // for local dev, remove if not needed
];
app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps, curl, etc.)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
}));
// Handle preflight requests for all routes
app.options('*', cors());

app.use(express.json());

// Serve static files from uploads directory
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Serve static files from dist directory (built frontend)
app.use(express.static(path.join(__dirname, "../dist")));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/donations", donationRoutes);
app.use("/api/prashad", prashadRoutes);
app.use("/api/community", communityRoutes);
app.use("/api/gallery", galleryRoutes);

// Serve frontend for all non-API routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});

const PORT = process.env.PORT || 5000;

// For traditional server deployment (Render, Railway, etc.)
if (process.env.NODE_ENV !== 'serverless') {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`http://0.0.0.0:${PORT}`);
  });
}

// 👇 Export handler for Vercel serverless function
export const handler = serverless(app);
