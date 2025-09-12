// components/FileAnalyzer.js
import React, { useState } from 'react';
import { FaQuestionCircle, FaStickyNote, FaBook, FaListOl } from 'react-icons/fa';

const FileAnalyzer = ({ result, onOptionSelect, darkMode }) => {
  const [selectedTopic, setSelectedTopic] = useState(result.topics[0]);
  
  const options = [
    { id: 'quiz', icon: <FaQuestionCircle />, label: 'Generate Quiz', description: 'Create quizzes based on the content' },
    { id: 'notes', icon: <FaStickyNote />, label: 'Create Notes', description: 'Generate sticky notes with formulas and keywords' },
    { id: 'materials', icon: <FaBook />, label: 'Study Materials', description: 'Create simple or detailed study materials' },
    { id: 'questions', icon: <FaListOl />, label: 'Important Questions', description: 'Generate important questions (3,4,5,7,10)' }
  ];

  return (
    <div className={`file-analyzer ${darkMode ? 'dark' : ''}`}>
      <div className="analysis-topics">
        <h3>Detected Topics</h3>
        <div className="topics-list">
          {result.topics.map(topic => (
            <button 
              key={topic}
              className={selectedTopic === topic ? 'active' : ''}
              onClick={() => setSelectedTopic(topic)}
            >
              {topic}
            </button>
          ))}
        </div>
      </div>
      
      <div className="analysis-keywords">
        <h3>Keywords</h3>
        <div className="keywords-list">
          {result.keywords.map(keyword => (
            <span key={keyword} className="keyword-tag">{keyword}</span>
          ))}
        </div>
      </div>
      
      <div className="analysis-options">
        <h3>What would you like to generate?</h3>
        <div className="options-grid">
          {options.map(option => (
            <div 
              key={option.id}
              className="option-card"
              onClick={() => onOptionSelect(option.id)}
            >
              <div className="option-icon">{option.icon}</div>
              <h4>{option.label}</h4>
              <p>{option.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FileAnalyzer;