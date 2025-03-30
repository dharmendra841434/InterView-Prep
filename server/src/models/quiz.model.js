import mongoose from "mongoose";

const quizSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    topic: {
      type: String,
      required: true,
      trim: true,
    },
    poster: {
      type: String, // Store image URL
      required: true, // Optional field
    },
    questions: {
      type: String,
      required: true,
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

const Quiz = mongoose.model("Quiz", quizSchema);

export default Quiz;
