import User from "../model/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Find the admin user by email
    const admin = await User.findOne({ email, role: "admin" });

    if (!admin) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    // Check if the password matches
    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    

    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );

    res.cookie("token", token);

    res.status(200).json({
      success: true,
      message: "Admin login successful",
    });
  } catch (error) {
    console.error("Admin login error:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Admin Dashboard route
export const adminDashboard = async (req, res) => {
  try {  
    res.status(200).json({
      success: true,
      message: "Admin Dashboard",
    });

  } catch (error) {
    console.error("Admin Dashboard error:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


// Admin Logout route

export const adminLogout = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ success: true, message: "Logged out successfully" });
};