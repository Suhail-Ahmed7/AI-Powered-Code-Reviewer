import React, { useState, useEffect } from 'react';
import CodeInput from './components/CodeInput';
import ReviewHistory from './components/ReviewHistory';
import './App.css';

function App() {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    document.body.classList.toggle('light-theme', theme === 'light');
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div>
      <header>
        <h1>AI Code Reviewer</h1>
        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>
      </header>
      <main>
        <CodeInput />
        <ReviewHistory />
      </main>
    </div>
  );
}

export default App;
