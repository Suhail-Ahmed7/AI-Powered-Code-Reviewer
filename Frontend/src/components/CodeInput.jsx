import React, { useState } from 'react';
import axios from 'axios';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const CodeInput = () => {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [feedback, setFeedback] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const languages = ['javascript', 'python', 'java', 'cpp', 'ruby', 'csharp', 'go', 'php', 'typescript'];


  // Language detection patterns
  const languageChecks = {
    javascript: /function\s+|const\s+|let\s+|=>/,
    python: /def\s+|print\s*\(|import\s+/,
    java: /public\s+class|System\.out\.println|void\s+main/,
    cpp: /#include\s+<.*>|int\s+main\s*\(\)/,
    ruby: /def\s+|puts\s+/,
    csharp: /using\s+System|namespace\s+\w+|Console\.WriteLine/,
    go: /package\s+main|func\s+main\s*\(\)/,
    php: /<\?php|echo\s+|function\s+\w+/,
    typescript: /interface\s+|type\s+|:\s+\w+/,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setFeedback('');

    if (!code.trim()) {
      setError('⚠️ Please paste some code to review!');
      return;
    }

    // Match code with selected language pattern
    const pattern = languageChecks[language.toLowerCase()];
    if (pattern && !pattern.test(code)) {
      setError(`🚫 This code doesn't look like valid ${language} code.`);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('/ai/get-review', { code }); 
      setFeedback(response.data.feedback);
    } catch (err) {
      setError(err.response?.data?.message || '❌ Failed to get AI review');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="code-input">
      <h2>🚀 AI Code Reviewer</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>🧠 Programming Language</label>
          <select value={language} onChange={(e) => setLanguage(e.target.value)}>
            {languages.map((lang) => (
              <option key={lang} value={lang}>
                {lang.charAt(0).toUpperCase() + lang.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>📄 Code Snippet</label>
          <textarea
            rows={10}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder={`Paste your ${language} code here...`}
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? '🧠 Reviewing...' : '💡 Review Code'}
        </button>
      </form>

      {error && <p className="error">{error}</p>}

      {feedback && (
        <div className="feedback">
          <h3>✅ AI Feedback</h3>
          <SyntaxHighlighter language="text" style={vscDarkPlus} wrapLines wrapLongLines>
            {feedback}
          </SyntaxHighlighter>
        </div>
      )}
    </div>
  );
};

export default CodeInput;
