const CodeReview = require('../models/codeReview');
const aiService = require('../utils/aiservice');

module.exports.getResponse = async (req, res) => {
  const code = req.body.code;

  if (!code) {
    return res.status(400).json({
      success: false,
      message: "Code is required!",
    });
  }

  try {
    const feedback = await aiService(code);

    await CodeReview.create({ code, feedback });

    res.status(200).json({
      success: true,
      feedback,
    });
  } catch (error) {
    console.error("AI Service Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to generate AI response",
    });
  }
};

module.exports.getHistory = async (req, res) => {
  try {
    const history = await CodeReview.find().sort({ createdAt: -1 }); 
    res.status(200).json({
      success: true,
      history,
    });
  } catch (error) {
    console.error("Fetch History Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch history",
    });
  }
};
