import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Admin from "../models/admin.model.js";

dotenv.config(); // Load environment variables

const JWTSECRET = process.env.JWTSECRET;

const verifyAdminToken = async (req, res, next) => {
  console.log("AuthMiddleware => verifyAdminToken");

  try {
    // Get token from headers
    let adminToken = req.headers.authorization;
    if (!adminToken) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }

    // Extract token
    let token = adminToken.split(" ")[1];

    // Verify token
    let payload = jwt.verify(token, JWTSECRET);

    // Find admin by ID from the token payload
    let admin = await Admin.findById(payload._id);
    if (!admin) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }

    console.log(`Admin with ID ${admin._id} authenticated.`);

    // Attach admin ID to request object for later use
    req.body.adminId = admin._id;

    next();
  } catch (error) {
    console.error("Authentication Error:", error);
    return res
      .status(401)
      .json({ message: "Unauthorized: Invalid or expired token" });
  }
};

export { verifyAdminToken };
