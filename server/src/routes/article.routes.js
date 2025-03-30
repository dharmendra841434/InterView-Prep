import { Router } from "express";
import { verifyAdminToken } from "../middlewares/AuthMiddleware.js";
import { createArticle } from "../controllers/article.controller.js";

const router = Router();

router.get("/health", (req, res) => {
  res.send("Article Service is Healthy!");
});

router.route("/create-new").post(verifyAdminToken, createArticle);

export default router;
