// server/models/Product.js
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Links to the User who sold it
    required: true,
  },
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  images: [String], // Array of image URLs
  condition: { type: String, required: true }, // e.g., 'Good', 'Fair'

  // This is the heart of ScrapRoute:
  verificationStatus: {
    type: String,
    enum: ["pending", "verified", "rejected"],
    default: "pending", // Default is ALWAYS pending until Admin sees it
  },

  isSold: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Product", productSchema);
