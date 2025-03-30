import Article from "../models/article.model.js";

// Create and Store a New Article
export const createArticle = async (req, res) => {
  try {
    const { title, topic, poster, body } = req.body;

    // Validate required fields
    if (!title || !topic || !body || !poster) {
      return res
        .status(400)
        .json({ message: "Title, topic,Poster and body are required." });
    }

    // Create new article
    const newArticle = new Article({
      title,
      topic,
      poster,
      body,
    });

    // Save to database
    await newArticle.save();

    res
      .status(201)
      .json({ message: "Article created successfully", article: newArticle });
  } catch (error) {
    console.error("Error creating article:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
