import { VM } from "vm2";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const executeCode = (req, res) => {
  const { code } = req.body;

  let logs = []; // Store logs here

  const vm = new VM({
    timeout: 2000, // Prevent infinite loops
    sandbox: {
      console: {
        log: (...args) => logs.push(args.join(" ")), // Capture console.log()
        error: (...args) => logs.push("ERROR: " + args.join(" ")),
        warn: (...args) => logs.push("WARNING: " + args.join(" ")),
      },
    },
  });

  try {
    vm.run(code);
    res.json({ output: logs.join("\n") }); // Send logs as a formatted string
  } catch (error) {
    res.json({ output: "Error: " + error.message });
  }
};

export const generateQuizAssets = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ message: "Message is required" });
    }

    // Initialize model
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    // Generate response
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: message }] }],
      generationConfig: {
        responseMimeType: "application/json", // Ensures the response is JSON
      },
    });

    const responseJson = result.response.text();
    //console.log(responseJson);

    res.status(200).json({ message: responseJson });
  } catch (error) {
    console.error("Gemini AI Error:", error);
    res
      .status(500)
      .json({ message: "Error generating response", error: error.message });
  }
};

export const generateArticleAssets = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ message: "Message is required" });
    }

    // Initialize model
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    // Generate response
    const result = await model.generateContent(message);
    const response = result.response.text();

    res.status(200).json({ message: response });
  } catch (error) {
    console.error("Gemini AI Error:", error);
    res
      .status(500)
      .json({ message: "Error generating response", error: error.message });
  }
};
