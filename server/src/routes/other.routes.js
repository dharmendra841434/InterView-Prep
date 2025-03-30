import { Router } from "express";
import { verifyAdminToken } from "../middlewares/AuthMiddleware.js";
import {
  executeCode,
  generateArticleAssets,
  generateQuizAssets,
} from "../controllers/otherFeatures.controller.js";

const router = Router();

router.get("/health", (req, res) => {
  res.send("Other featurs Service is Healthy!");
});

router.route("/execute-code").post(executeCode);
router.route("/generate-assets/generate-quiz").post(generateQuizAssets);
router.route("/generate-assets/generate-article").post(generateArticleAssets);

export default router;
