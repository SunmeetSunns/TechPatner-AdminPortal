const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const errorHandler = require("./utils/globalErrorHandler");
require("dotenv").config();
const apiRoute = require("./routes/api");
const app = express();
// Middlewares
app.use(cors());
app.use(express.json());

// MongoDB Connection
const mongoURI = process.env.MONGO_URI;

app.use("/api/v1", apiRoute);
app.use(errorHandler);

mongoose
  .connect(mongoURI)
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Default route
app.get("/", (req, res) => {
  res.send("🚀 TechPatner Backend API is running");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🔊 Server running on http://localhost:${PORT}`)
);
