const Product = require("../models/Product");

// @desc    Create a product (Seller only)
// @route   POST /api/products
const createProduct = async (req, res) => {
  const { title, description, price, condition, images } = req.body;

  try {
    const product = new Product({
      seller: req.user._id, // Gets ID from the token (authMiddleware)
      title,
      description,
      price,
      condition,
      images,
      verificationStatus: "pending", // Default status
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Product creation failed", error: error.message });
  }
};

// @desc    Get all products (For Admin & Vendor)
// @route   GET /api/products
const getProducts = async (req, res) => {
  try {
    // If user is Admin, they see ALL products (including pending)
    // If user is Vendor, they ONLY see 'verified' products
    // We handle this logic here or via query params.
    // For simplicity now: Admin dashboard calls with ?status=pending
    // Vendor dashboard calls with ?status=verified

    const { status } = req.query;

    let query = {};
    if (status) {
      query.verificationStatus = status;
    }

    // Populate adds the Seller's name and email to the result
    const products = await Product.find(query).populate("seller", "name email");
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Verify or Reject a product (Admin only)
// @route   PUT /api/products/verify/:id
const verifyProduct = async (req, res) => {
  const { status } = req.body; // Expecting 'verified' or 'rejected'

  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      product.verificationStatus = status;
      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Update failed" });
  }
};

module.exports = { createProduct, getProducts, verifyProduct };
