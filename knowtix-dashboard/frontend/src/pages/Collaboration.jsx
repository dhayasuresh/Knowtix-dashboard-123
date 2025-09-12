// components/Collaboration.js
import React, { useState } from 'react';
import { FaCode, FaUsers, FaChalkboard, FaExternalLinkAlt, FaPlay } from 'react-icons/fa';

const Collaboration = () => {
  const [activeTab, setActiveTab] = useState('code-editor');
  const [language, setLanguage] = useState('python');
  const [code, setCode] = useState(`# Python Code Example
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

# Print the first 10 Fibonacci numbers
for i in range(10):
    print(fibonacci(i))`);
  
  const [whiteboardData, setWhiteboardData] = useState('');
  const [drawing, setDrawing] = useState(false);
  const [color, setColor] = useState('#000000');
  const [brushSize, setBrushSize] = useState(5);
  
  const learningResources = [
    { 
      title: 'Python Tutorial', 
      url: 'https://www.python.org/doc/', 
      description: 'Official Python documentation and tutorials' 
    },
    { 
      title: 'JavaScript Guide', 
      url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript', 
      description: 'Comprehensive JavaScript guide by MDN' 
    },
    { 
      title: 'HTML & CSS Basics', 
      url: 'https://developer.mozilla.org/en-US/docs/Learn/HTML', 
      description: 'Learn the fundamentals of web development' 
    },
    { 
      title: 'C++ Reference', 
      url: 'https://en.cppreference.com/w/', 
      description: 'Complete C++ standard library reference' 
    },
    { 
      title: 'React Documentation', 
      url: 'https://reactjs.org/docs/getting-started.html', 
      description: 'Official React documentation and guides' 
    }
  ];
  
  const handleCodeChange = (e) => {
    setCode(e.target.value);
  };
  
  const runCode = () => {
    // In a real app, this would send the code to a backend service for execution
    alert('Code execution would happen here in a real implementation');
  };
  
  const handleWhiteboardMouseDown = () => {
    setDrawing(true);
  };
  
  const handleWhiteboardMouseUp = () => {
    setDrawing(false);
  };
  
  const handleWhiteboardMouseMove = (e) => {
    if (!drawing) return;
    
    // In a real app, this would draw on the canvas
    console.log('Drawing on whiteboard');
  };
  
  const clearWhiteboard = () => {
    setWhiteboardData('');
  };
  
  return (
    <div className="collaboration">
      <div className="collaboration-header">
        <h2 className="page-title">Collaboration</h2>
        <div className="tabs">
          <button 
            className={`tab ${activeTab === 'code-editor' ? 'active' : ''}`}
            onClick={() => setActiveTab('code-editor')}
          >
            <FaCode /> Code Editor
          </button>
          <button 
            className={`tab ${activeTab === 'whiteboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('whiteboard')}
          >
            <FaChalkboard /> Whiteboard
          </button>
          <button 
            className={`tab ${activeTab === 'resources' ? 'active' : ''}`}
            onClick={() => setActiveTab('resources')}
          >
            <FaExternalLinkAlt /> Learning Resources
          </button>
        </div>
      </div>
      
      {activeTab === 'code-editor' && (
        <div className="code-editor-container">
          <div className="editor-header">
            <div className="language-selector">
              <label htmlFor="language">Language:</label>
              <select 
                id="language"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                <option value="python">Python</option>
                <option value="javascript">JavaScript</option>
                <option value="html">HTML</option>
                <option value="css">CSS</option>
                <option value="c">C</option>
                <option value="cpp">C++</option>
                <option value="java">Java</option>
              </select>
            </div>
            <div className="editor-actions">
              <button className="run-code-btn" onClick={runCode}>
                <FaPlay /> Run Code
              </button>
            </div>
          </div>
          
          <div className="editor-container">
            <div className="code-editor">
              <textarea
                value={code}
                onChange={handleCodeChange}
                spellCheck="false"
              />
            </div>
            
            <div className="output-container">
              <h4>Output</h4>
              <div className="output">
                {/* In a real app, this would display the output of the code */}
                <pre>
                  0
                  1
                  1
                  2
                  3
                  5
                  8
                  13
                  21
                  34
                </pre>
              </div>
            </div>
          </div>
          
          <div className="collaboration-features">
            <h3>Collaboration Features</h3>
            <div className="feature-list">
              <div className="feature-item">
                <h4>Real-time Collaboration</h4>
                <p>Work together with your peers on the same code in real-time</p>
              </div>
              <div className="feature-item">
                <h4>Video Chat</h4>
                <p>Integrated video chat for better communication while coding</p>
              </div>
              <div className="feature-item">
                <h4>Code Sharing</h4>
                <p>Share your code with others using a unique link</p>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {activeTab === 'whiteboard' && (
        <div className="whiteboard-container">
          <div className="whiteboard-header">
            <div className="whiteboard-tools">
              <div className="tool-group">
                <label htmlFor="brush-color">Color:</label>
                <input 
                  type="color" 
                  id="brush-color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                />
              </div>
              
              <div className="tool-group">
                <label htmlFor="brush-size">Size:</label>
                <input 
                  type="range" 
                  id="brush-size"
                  min="1"
                  max="20"
                  value={brushSize}
                  onChange={(e) => setBrushSize(parseInt(e.target.value))}
                />
                <span>{brushSize}px</span>
              </div>
              
              <div className="tool-group">
                <button className="tool-btn" onClick={clearWhiteboard}>
                  Clear
                </button>
                <button className="tool-btn">
                  Save
                </button>
                <button className="tool-btn">
                  Upload Image
                </button>
              </div>
            </div>
          </div>
          
          <div className="whiteboard-area">
            <div 
              className="whiteboard-canvas"
              onMouseDown={handleWhiteboardMouseDown}
              onMouseUp={handleWhiteboardMouseUp}
              onMouseMove={handleWhiteboardMouseMove}
            >
              {/* In a real app, this would be a canvas element for drawing */}
              <div className="canvas-placeholder">
                <p>Whiteboard canvas - Click and drag to draw</p>
                <p>Supports drawing, text, shapes, and image uploads</p>
              </div>
            </div>
            
            <div className="whiteboard-sidebar">
              <div className="sidebar-section">
                <h4>Shapes</h4>
                <div className="shape-tools">
                  <button className="shape-btn">Rectangle</button>
                  <button className="shape-btn">Circle</button>
                  <button className="shape-btn">Line</button>
                  <button className="shape-btn">Arrow</button>
                </div>
              </div>
              
              <div className="sidebar-section">
                <h4>Text</h4>
                <div className="text-tools">
                  <input type="text" placeholder="Enter text" />
                  <button className="add-text-btn">Add</button>
                </div>
              </div>
              
              <div className="sidebar-section">
                <h4>Participants</h4>
                <div className="participants-list">
                  <div className="participant">
                    <div className="participant-avatar">You</div>
                    <div className="participant-name">You (Host)</div>
                  </div>
                  <button className="invite-btn">Invite Others</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {activeTab === 'resources' && (
        <div className="resources-container">
          <h3>Learning Resources</h3>
          <div className="resources-grid">
            {learningResources.map((resource, index) => (
              <div key={index} className="resource-card">
                <div className="resource-header">
                  <h4>{resource.title}</h4>
                  <a 
                    href={resource.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="resource-link"
                  >
                    <FaExternalLinkAlt />
                  </a>
                </div>
                <p className="resource-description">{resource.description}</p>
                <div className="resource-actions">
                  <button className="resource-btn">Save for Later</button>
                  <button className="resource-btn">Share</button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="custom-resources">
            <h3>Add Your Own Resources</h3>
            <div className="add-resource-form">
              <div className="form-group">
                <label htmlFor="resource-title">Title</label>
                <input type="text" id="resource-title" placeholder="Resource title" />
              </div>
              <div className="form-group">
                <label htmlFor="resource-url">URL</label>
                <input type="text" id="resource-url" placeholder="https://example.com" />
              </div>
              <div className="form-group">
                <label htmlFor="resource-description">Description</label>
                <textarea id="resource-description" placeholder="Brief description of the resource"></textarea>
              </div>
              <button className="add-resource-btn">Add Resource</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Collaboration;