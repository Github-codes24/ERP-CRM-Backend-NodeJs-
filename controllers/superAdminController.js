const SuperAdminModel = require("../models/superAdminModel");
const nodemailer = require("nodemailer");

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
    console.log(superAdmin);
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

// Function to generate a simple random string
const generateRandomString = (length) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

const sendResetLink = async (req, res) => {
  try {
    const { email } = req.body;

    // Validate the email
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    // Find the user by email
    const superAdmin = await SuperAdminModel.findOne({ email });
    if (!superAdmin) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate a simple random reset code
    const resetCode = generateRandomString(6); // Example: 6 characters
    superAdmin.resetLink = resetCode; // Save the reset code to the user's record
    await superAdmin.save();

    // Send email with the reset code
    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    
    await transporter.sendMail({
      to: email,
      subject: 'Password Reset Request',
      html: `<p>Your password reset code is: <strong>${resetCode}</strong></p>`,
    });

    return res.status(200).json({ message: "Reset code sent to your email" });
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { email, resetCode, newPassword } = req.body;

    // Validate the input fields
    if (!email || !resetCode || !newPassword) {
      return res.status(400).json({ message: "Email, reset code, and new password are required" });
    }

    // Find the user by email
    const superAdmin = await SuperAdminModel.findOne({ email });
    if (!superAdmin) {
      return res.status(404).json({ message: "User not found" });
    }

    // Verify the reset code
    if (superAdmin.resetLink !== resetCode) {
      return res.status(401).json({ message: "Invalid reset code" });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password and clear the reset link
    superAdmin.password = hashedPassword;
    superAdmin.resetLink = ''; // Clear the reset code
    await superAdmin.save();

    return res.status(200).json({ message: "Password has been reset successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = { login,sendResetLink,resetPassword};
