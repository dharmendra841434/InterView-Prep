import { Router } from "express";
import { verifyAdminToken } from "../middlewares/AuthMiddleware.js";
import {
  createQuiz,
  getQuizzesByTopic,
} from "../controllers/quiz.controller.js";

const router = Router();

router.get("/health", (req, res) => {
  res.send("Quiz Service is Healthy!");
});

router.route("/create-new").post(verifyAdminToken, createQuiz);
// Route to create a new quiz (Admin Only)
router.post("/quizzes", createQuiz);

// Route to get quizzes by topic
router.get("/quizzes/topic", getQuizzesByTopic);

export default router;
