import axios from "axios";
import { GoogleGenerativeAI } from "@google/generative-ai";
export const generate = async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) return res.status(400).json({ error: "Prompt is required" });
    const genAI = new GoogleGenerativeAI("AIzaSyCIBvhHcbYiDBb12m5tHjjMjH-2KOJGFpg");
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const response = await model.generateContent(prompt);
    res.json({ message: response });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
