import User from "../model/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const login = async (req, res) => {
  try {
    const { phoneOrEmail, password } = req.body;

    //  Admin login via email
    let user;
    if (phoneOrEmail.includes("@")) {
      user = await User.findOne({ email: phoneOrEmail, role: "admin" });
      if (!user) return res.status(401).json({ message: "Invalid credentials" });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    } else {
      // Customer login via phone
      user = await User.findOne({ phone: phoneOrEmail, role: "user" });
      if (!user) return res.status(401).json({ message: "Invalid credentials" });

      if (user.password !== phoneOrEmail) return res.status(401).json({ message: "Invalid credentials" });
    }

    // JWT Token
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "2h" });
    res.cookie("token", token);

    res.status(200).json({
      success: true,
      message: `${user.role} login successful`,
      user: { name: user.name, role: user.role, phone: user.phone },
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin Dashboard route
export const adminDashboard = async (req, res) => {
  try {  
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if(user.role !== "admin") return res.status(403).json({ message: "Forbidden" });

    res.status(200).json({
      success: true,
      message: "Admin Dashboard",
      user,
    });
  } catch (error) {
    console.error("Admin Dashboard error:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// User Dashboard route
export const userDashboard = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if(user.role !== "user") return res.status(403).json({ message: "Forbidden" });

    res.status(200).json({
      success: true,
      message: "User Dashboard",
      user,
    });
  } catch (error) {
    console.error("User Dashboard error:", error.message);
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