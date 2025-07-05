import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const ReviewHistory = () => {
  const [reviews, setReviews] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [error, setError] = useState('');
  const [showHistory, setShowHistory] = useState(false);

  const fetchReviews = async () => {
    try {
      const { data } = await axios.get('/ai/history');
      setReviews(data.history || []);
    } catch {
      setError('❌ Failed to fetch review history');
      setReviews([]);
    }
  };


  useEffect(() => {
    fetchReviews();
  }, []);

  const handleNext = () => {
    if (currentIndex < reviews.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleShow = () => {
    setShowHistory(true);
    setCurrentIndex(0); 
  };

  const handleClose = () => {
    setShowHistory(false);
  };

  return (
    <div className="review-history">
      <h2>📚 AI Review History</h2>

      {!showHistory ? (
        <button onClick={handleShow} disabled={reviews.length === 0}>
          🔍 Show History
        </button>
      ) : (
        <>
          {error && <p className="error">{error}</p>}

          {reviews.length === 0 ? (
            <p className="no-reviews">No reviews yet.</p>
          ) : (
            <div className="review-item">
              <h3>📄 Code Snippet</h3>
              <SyntaxHighlighter language="javascript" style={vscDarkPlus} wrapLines>
                {reviews[currentIndex].code}
              </SyntaxHighlighter>

              <h3>🧠 AI Feedback</h3>
              <SyntaxHighlighter language="text" style={vscDarkPlus} wrapLines>
                {reviews[currentIndex].feedback}
              </SyntaxHighlighter>

              <p>📅 Reviewed on: {new Date(reviews[currentIndex].createdAt).toLocaleString()}</p>

              <div className="nav-buttons">
                <button onClick={handlePrev} disabled={currentIndex === 0}>⬅️ Previous</button>
                <button onClick={handleNext} disabled={currentIndex === reviews.length - 1}>Next ➡️</button>
                <button onClick={handleClose}>❌ Close</button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ReviewHistory;
