import bcrypt from "bcrypt";
import PlatformAdmin from "../models/admin.model.js";

// 1️⃣ Create a New Admin
export const createAdmin = async (req, res) => {
  try {
    const { adminUsername, full_name, password } = req.body;

    // Check if the username already exists
    const existingAdmin = await PlatformAdmin.findOne({ adminUsername });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin username already taken" });
    }

    // Create new admin (password will be hashed automatically by pre-save middleware)
    const newAdmin = new PlatformAdmin({
      adminUsername,
      full_name,
      password,
    });

    await newAdmin.save();

    // // Generate JWT Token
    // const token = newAdmin.generateJWTToken();

    res.status(201).json({ message: "Admin created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// 2️⃣ Update Admin Username & Password
export const updateAdmin = async (req, res) => {
  try {
    const { adminId } = req.params;
    const { adminUsername, full_name, password } = req.body;

    // Find admin by ID
    const admin = await PlatformAdmin.findById(adminId);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Update fields if provided
    if (adminUsername) admin.adminUsername = adminUsername;
    if (full_name) admin.full_name = full_name;
    if (password) {
      admin.password = await bcrypt.hash(password, 10);
    }

    await admin.save();

    res.status(200).json({ message: "Admin updated successfully", admin });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// 3️⃣ Admin Login (Authenticate & Generate Token)
export const loginAdmin = async (req, res) => {
  try {
    const { adminUsername, password } = req.body;

    // console.log(adminUsername);

    // Find admin by username
    const admin = await PlatformAdmin.findOne({ adminUsername });
    if (!admin) {
      return res.status(401).json({ message: "Invalid admin username" });
    }

    // Check password
    const isMatch = await admin.checkPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid admin password" });
    }

    // Generate JWT Token
    const token = admin.generateJWTToken();

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
