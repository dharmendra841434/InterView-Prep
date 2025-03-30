import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import AdminRouter from "./routes/admin.routes.js";
import OtherFeaturesRouter from "./routes/other.routes.js";
import QuizRouter from "./routes/quiz.routes.js";
import ArticleRouter from "./routes/article.routes.js";
import DBConnector from "./databases/connection.mongodb.js";
import bodyParser from "body-parser";

const app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

const corsConfig = {
  origin: [
    "http://localhost:3000",
    "https://interview-prepration-seven.vercel.app",
  ],
  methods: ["GET", "POST", "PUT", "DELETE"], // Include all HTTP methods you expect to use
  credentials: true, // Allow cookies to be sent/received
  allowedHeaders: ["Content-Type", "Authorization"], // Specify headers you allow
};

app.use(cors(corsConfig));

const PORT = process.env.PORT || 5000;

DBConnector();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/v1/admin", AdminRouter);
app.use("/api/v1/other-features", OtherFeaturesRouter);
app.use("/api/v1/article", ArticleRouter);
app.use("/api/v1/quiz", QuizRouter);

app.listen(PORT, () => {
  console.log("App is running on PORT", PORT);
});
