const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_KEY);

const aiService = async (userCode) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const systemInstruction = `
You are a senior code reviewer.

Your job is:
1. Identify mistakes in the code (logic, syntax, best practices).
2. Explain mistakes briefly in 2-3 bullet points.
3. Then provide a corrected version of the code.

⚠️ Do NOT include long descriptions or summaries.
Respond ONLY in this format:

❌ Mistakes:
- Point 1
- Point 2
- Point 3

✅ Correct Code:
\`\`\`language
// fixed code here
\`\`\`
`;

    const fullPrompt = `${systemInstruction}\n\n${userCode}`;

    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [{ text: fullPrompt }]
        }
      ]
    });

    const response = await result.response;
    return response.text();
  } catch (err) {
    console.error("Gemini AI Error:", err.message);
    throw err;
  }
};

module.exports = aiService;
