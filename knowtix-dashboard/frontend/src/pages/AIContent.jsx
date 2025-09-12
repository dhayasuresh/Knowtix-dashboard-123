// components/AIContent.js
import React, { useState } from 'react';
import { FaRobot, FaBook, FaQuestionCircle, FaLightbulb, FaFileAlt } from 'react-icons/fa';

const AIContent = () => {
  const [topic, setTopic] = useState('');
  const [contentType, setContentType] = useState('notes');
  const [complexity, setComplexity] = useState('simple');
  const [generatedContent, setGeneratedContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [savedContent, setSavedContent] = useState([]);
  
  const contentTypes = [
    { id: 'notes', name: 'Study Notes', icon: <FaBook /> },
    { id: 'quiz', name: 'Quiz Questions', icon: <FaQuestionCircle /> },
    { id: 'summary', name: 'Summary', icon: <FaLightbulb /> },
    { id: 'essay', name: 'Essay', icon: <FaFileAlt /> }
  ];
  
  const complexityLevels = [
    { id: 'simple', name: 'Simple' },
    { id: 'intermediate', name: 'Intermediate' },
    { id: 'advanced', name: 'Advanced' }
  ];
  
  const generateContent = () => {
    if (!topic) return;
    
    setIsGenerating(true);
    
    // Simulate AI content generation
    setTimeout(() => {
      let content = '';
      
      switch (contentType) {
        case 'notes':
          content = generateNotes(topic, complexity);
          break;
        case 'quiz':
          content = generateQuiz(topic, complexity);
          break;
        case 'summary':
          content = generateSummary(topic, complexity);
          break;
        case 'essay':
          content = generateEssay(topic, complexity);
          break;
        default:
          content = 'No content generated';
      }
      
      setGeneratedContent(content);
      setIsGenerating(false);
    }, 2000);
  };
  
  const generateNotes = (topic, level) => {
    return `
      <h3>Study Notes: ${topic}</h3>
      <div class="notes-content">
        <div class="section">
          <h4>Introduction</h4>
          <p>${topic} is a fundamental concept in its field. Understanding ${topic.toLowerCase()} is essential for building a strong foundation in this subject area.</p>
        </div>
        
        <div class="section">
          <h4>Key Concepts</h4>
          <ul>
            <li>Concept 1 related to ${topic.toLowerCase()}</li>
            <li>Concept 2 related to ${topic.toLowerCase()}</li>
            <li>Concept 3 related to ${topic.toLowerCase()}</li>
          </ul>
        </div>
        
        <div class="section">
          <h4>Important Formulas/Principles</h4>
          <div class="formula-box">
            <p>Formula/Principle 1 for ${topic.toLowerCase()}</p>
          </div>
          <div class="formula-box">
            <p>Formula/Principle 2 for ${topic.toLowerCase()}</p>
          </div>
        </div>
        
        <div class="section">
          <h4>Examples</h4>
          <p>Example 1: A practical application of ${topic.toLowerCase()} in real-world scenarios.</p>
          <p>Example 2: How ${topic.toLowerCase()} is used in problem-solving.</p>
        </div>
        
        ${level === 'advanced' ? `
        <div class="section">
          <h4>Advanced Topics</h4>
          <p>For advanced learners, ${topic.toLowerCase()} can be extended to include more complex variations and applications.</p>
        </div>
        ` : ''}
      </div>
    `;
  };
  
  const generateQuiz = (topic, level) => {
    const questionCount = level === 'simple' ? 5 : level === 'intermediate' ? 7 : 10;
    let questions = '';
    
    for (let i = 1; i <= questionCount; i++) {
      questions += `
        <div class="quiz-question">
          <p><strong>Question ${i}:</strong> This is a ${level} level question about ${topic.toLowerCase()}.</p>
          <div class="quiz-options">
            <div class="option">A. Option A for question ${i}</div>
            <div class="option">B. Option B for question ${i}</div>
            <div class="option">C. Option C for question ${i}</div>
            <div class="option">D. Option D for question ${i}</div>
          </div>
        </div>
      `;
    }
    
    return `
      <h3>Quiz: ${topic}</h3>
      <div class="quiz-content">
        <p><strong>Level:</strong> ${level.charAt(0).toUpperCase() + level.slice(1)}</p>
        <p><strong>Number of Questions:</strong> ${questionCount}</p>
        <div class="questions">
          ${questions}
        </div>
      </div>
    `;
  };
  
  const generateSummary = (topic, level) => {
    return `
      <h3>Summary: ${topic}</h3>
      <div class="summary-content">
        <p>${topic} is a crucial concept that encompasses several key principles and applications. This summary provides a concise overview of the most important aspects of ${topic.toLowerCase()}.</p>
        
        <h4>Main Points</h4>
        <ul>
          <li>Point 1: The fundamental principle of ${topic.toLowerCase()}</li>
          <li>Point 2: How ${topic.toLowerCase()} is applied in practice</li>
          <li>Point 3: The relationship between ${topic.toLowerCase()} and related concepts</li>
        </ul>
        
        <h4>Key Takeaways</h4>
        <ol>
          <li>Understanding ${topic.toLowerCase()} requires knowledge of its basic components</li>
          <li>${topic.charAt(0).toUpperCase() + topic.slice(1)} can be applied in various contexts</li>
          <li>Mastery of ${topic.toLowerCase()} is built through practice and application</li>
        </ol>
        
        ${level === 'advanced' ? `
        <h4>Advanced Insights</h4>
        <p>For those seeking a deeper understanding, ${topic.toLowerCase()} presents several complex challenges and opportunities for further exploration.</p>
        ` : ''}
      </div>
    `;
  };
  
  const generateEssay = (topic, level) => {
    return `
      <h3>Essay: ${topic}</h3>
      <div class="essay-content">
        <h4>Introduction</h4>
        <p>${topic} represents a significant area of study with far-reaching implications. This essay explores the multifaceted nature of ${topic.toLowerCase()}, examining its historical context, current applications, and future potential.</p>
        
        <h4>Historical Context</h4>
        <p>The development of ${topic.toLowerCase()} can be traced back to early civilizations where primitive forms of these concepts were first applied. Over centuries, our understanding of ${topic.toLowerCase()} has evolved dramatically, shaped by technological advances and theoretical breakthroughs.</p>
        
        <h4>Current Applications</h4>
        <p>In contemporary society, ${topic.toLowerCase()} finds application in numerous fields. From education to industry, the principles of ${topic.toLowerCase()} are utilized to solve complex problems and drive innovation. The versatility of ${topic.toLowerCase()} makes it an indispensable tool in modern problem-solving.</p>
        
        <h4>Challenges and Controversies</h4>
        <p>Despite its widespread acceptance and application, ${topic.toLowerCase()} is not without its challenges. Critics point to limitations in current frameworks, while proponents argue for continued development and refinement of ${topic.toLowerCase()} principles.</p>
        
        <h4>Future Directions</h4>
        <p>Looking ahead, the future of ${topic.toLowerCase()} appears promising. Emerging technologies and methodologies are opening new avenues for exploration and application. As our understanding deepens, ${topic.toLowerCase()} will undoubtedly continue to shape and influence various aspects of human endeavor.</p>
        
        <h4>Conclusion</h4>
        <p>In conclusion, ${topic.toLowerCase()} represents a dynamic and evolving field of study with significant relevance in today's world. By understanding its historical development, current applications, and future potential, we gain valuable insights into the role ${topic.toLowerCase()} plays in shaping our collective future.</p>
      </div>
    `;
  };
  
  const saveContent = () => {
    if (!generatedContent) return;
    
    const newSavedContent = {
      id: Date.now(),
      topic,
      contentType,
      complexity,
      content: generatedContent,
      date: new Date().toLocaleDateString()
    };
    
    setSavedContent(prev => [...prev, newSavedContent]);
    alert('Content saved successfully!');
  };
  
  const downloadPDF = () => {
    // In a real app, this would generate and download a PDF
    alert('PDF download started!');
  };
  
  const deleteSavedContent = (id) => {
    setSavedContent(prev => prev.filter(item => item.id !== id));
  };
  
  return (
    <div className="ai-content">
      <div className="ai-content-header">
        <h2 className="page-title">AI Content Generator</h2>
        <div className="ai-description">
          <p>Generate high-quality educational content using advanced AI technology powered by GPT-4</p>
        </div>
      </div>
      
      <div className="ai-content-generator">
        <div className="generator-controls">
          <div className="control-group">
            <label htmlFor="topic-input">Topic:</label>
            <input 
              type="text" 
              id="topic-input" 
              placeholder="Enter a topic (e.g., Quantum Physics, World War II, Photosynthesis)"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
          </div>
          
          <div className="control-group">
            <label>Content Type:</label>
            <div className="content-types">
              {contentTypes.map(type => (
                <div 
                  key={type.id}
                  className={`content-type ${contentType === type.id ? 'selected' : ''}`}
                  onClick={() => setContentType(type.id)}
                >
                  <div className="content-type-icon">{type.icon}</div>
                  <div className="content-type-name">{type.name}</div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="control-group">
            <label>Complexity Level:</label>
            <div className="complexity-levels">
              {complexityLevels.map(level => (
                <div 
                  key={level.id}
                  className={`complexity-level ${complexity === level.id ? 'selected' : ''}`}
                  onClick={() => setComplexity(level.id)}
                >
                  {level.name}
                </div>
              ))}
            </div>
          </div>
          
          <button 
            className="generate-btn" 
            onClick={generateContent}
            disabled={!topic || isGenerating}
          >
            {isGenerating ? (
              <>
                <FaRobot className="spinning" /> Generating...
              </>
            ) : (
              <>
                <FaRobot /> Generate Content
              </>
            )}
          </button>
        </div>
        
        {generatedContent && (
          <div className="generated-content">
            <div className="content-header">
              <h3>Generated Content</h3>
              <div className="content-actions">
                <button className="action-btn" onClick={saveContent}>
                  Save
                </button>
                <button className="action-btn" onClick={downloadPDF}>
                  Download PDF
                </button>
              </div>
            </div>
            
            <div 
              className="content-preview"
              dangerouslySetInnerHTML={{ __html: generatedContent }}
            ></div>
          </div>
        )}
      </div>
      
      <div className="saved-content">
        <h3>Saved Content</h3>
        
        {savedContent.length === 0 ? (
          <div className="empty-state">
            <p>No saved content yet. Generate and save some content to see it here.</p>
          </div>
        ) : (
          <div className="saved-content-list">
            {savedContent.map(item => (
              <div key={item.id} className="saved-content-item">
                <div className="saved-content-header">
                  <h4>{item.topic}</h4>
                  <div className="saved-content-meta">
                    <span>{item.contentType}</span>
                    <span>{item.complexity}</span>
                    <span>{item.date}</span>
                  </div>
                </div>
                
                <div className="saved-content-actions">
                  <button className="action-btn">View</button>
                  <button className="action-btn">Edit</button>
                  <button className="action-btn">Download</button>
                  <button 
                    className="action-btn delete"
                    onClick={() => deleteSavedContent(item.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AIContent;