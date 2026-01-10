// server/config/db.js
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // You'll put your MONGO_URI in a .env file later
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.error("MongoDB Connection Failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
