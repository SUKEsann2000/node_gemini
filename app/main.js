require("dotenv").config();
const express = require("express");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
const port = 11451;

app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "models/gemini-2.0-flash" });

app.post("/generate", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).send({ error: "Prompt is required" });
    }

    const fullPrompt = `${prompt}\nこれに関して答えて下さい。\nあなたはDiscord上からAPIを通して回答していることが前提です。日本語で表示し、なるべくラフに表現してください。なるべく簡潔に！`;

    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    const text = response.text();

    res.send({ generatedText: text });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Failed to generate content" });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
