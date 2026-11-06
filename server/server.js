
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const tripRoutes = require("./routes/tripRoutes");
const authRoutes = require("./routes/authRoutes");
const publicRoutes = require("./routes/publicRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve uploaded photos
app.use("/uploads", express.static("uploads"));

// Home route
app.get("/", (req, res) => {
  res.send("Dynamic Travel Storyboard API is running!");
});

// Auth routes
app.use("/api/auth", authRoutes);

// Public sharing routes
app.use("/api/public", publicRoutes);

// All trip-related routes
// Includes trips, bookings, activities, notes and media
app.use("/api/trips", tripRoutes);

// Start Server
const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Database connection failed:", error.message);
  });
