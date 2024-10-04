const SuperAdminModel = require("../models/superAdminModel");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate the input fields
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Find the user by email
    const superAdmin = await SuperAdminModel.findOne({ email });
    if (!superAdmin) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, superAdmin.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { id: superAdmin._id, email: superAdmin.email, role: "superAdmin" },
      process.env.JWT_SECRET, // Make sure to store the JWT secret in your environment variables
      { expiresIn: "1d" } // Token expires in 1 day
    );

    // Respond with the token and user info (excluding sensitive data like password)
    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: superAdmin._id,
        email: superAdmin.email,
        name: superAdmin.name,
      },
    });
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};



module.exports = { login };
