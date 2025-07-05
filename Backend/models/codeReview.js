const mongoose = require("mongoose");

const codeReviewSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
  },
  feedback: {
    type: String,
    required: true,
  },
  reviewedAt: {
    type: Date,
    default: Date.now,
  },
  language: {
    type: String,
    default: "JavaScript", 
  }
});

const CodeReview = mongoose.model("CodeReview", codeReviewSchema);

module.exports = CodeReview;
