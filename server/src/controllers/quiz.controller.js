import Quiz from "../models/quiz.model.js";

// Create and Store a New Quiz
export const createQuiz = async (req, res) => {
  try {
    const { title, topic, questions, poster } = req.body;

    //console.log(req.body);

    // Validate required fields
    if (!title || !topic || !poster || !questions) {
      return res.status(400).json({
        message: "Title, topic, and at least one question are required.",
      });
    }

    // Create new quiz
    const newQuiz = new Quiz({
      title,
      topic,
      poster,
      questions,
    });

    // Save to database
    await newQuiz.save();

    res.status(201).json({ message: "Quiz created successfully" });
  } catch (error) {
    console.error("Error creating quiz:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

// Get Random Quizzes
export const getRandomQuizzes = async (req, res) => {
  try {
    let { limit } = req.query;

    // Convert limit to a number and set default value if not provided
    limit = parseInt(limit) || 10;

    // Get random quizzes from the database
    const quizzes = await Quiz.aggregate([{ $sample: { size: limit } }]);

    res
      .status(200)
      .json({ message: "Random quizzes fetched successfully", quizzes });
  } catch (error) {
    console.error("Error fetching random quizzes:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

// Get Quizzes by Topic
export const getQuizzesByTopic = async (req, res) => {
  try {
    const { topic } = req.query;

    // Validate topic parameter
    if (!topic) {
      return res.status(400).json({ message: "Topic parameter is required" });
    }

    // Fetch quizzes that match the topic
    const quizzes = await Quiz.find({ topic: topic });

    // Check if quizzes exist for the given topic
    if (quizzes.length === 0) {
      return res
        .status(404)
        .json({ message: `No quizzes found for topic: ${topic}` });
    }

    res.status(200).json({ message: "Quizzes fetched successfully", quizzes });
  } catch (error) {
    console.error("Error fetching quizzes by topic:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
