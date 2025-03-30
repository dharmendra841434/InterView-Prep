import { Router } from "express";
import {
  createAdmin,
  loginAdmin,
  updateAdmin,
} from "../controllers/admin.controller.js";
import { verifyAdminToken } from "../middlewares/AuthMiddleware.js";

const router = Router();

router.get("/health", (req, res) => {
  res.send("Admin Auth Service is Healthy!");
});

router.route("/login").post(loginAdmin);
router.route("/create-new").post(createAdmin);
router.route("/update-admin").put(verifyAdminToken, updateAdmin);

export default router;
