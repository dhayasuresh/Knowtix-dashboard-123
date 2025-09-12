// components/FileUpload.js
import React, { useState } from 'react';
import { FaUpload, FaFilePdf, FaFileImage, FaFileAlt, FaTimes } from 'react-icons/fa';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [fileType, setFileType] = useState('');
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState('');
  const [contentType, setContentType] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
      
      // Determine file type
      const extension = selectedFile.name.split('.').pop().toLowerCase();
      if (extension === 'pdf') {
        setFileType('pdf');
      } else if (['jpg', 'jpeg', 'png', 'gif'].includes(extension)) {
        setFileType('image');
      } else if (['txt', 'doc', 'docx'].includes(extension)) {
        setFileType('text');
      } else {
        setFileType('other');
      }
    }
  };
  
  const analyzeFile = () => {
    if (!file) return;
    
    setIsAnalyzing(true);
    
    // Simulate file analysis
    setTimeout(() => {
      // Mock topics extraction
      const mockTopics = [
        'Algebraic Equations',
        'Quadratic Functions',
        'Polynomial Factorization',
        'Linear Inequalities',
        'Systems of Equations'
      ];
      
      setTopics(mockTopics);
      setIsAnalyzing(false);
    }, 2000);
  };
  
  const generateContent = () => {
    if (!selectedTopic || !contentType) return;
    
    setIsGenerating(true);
    
    // Simulate AI content generation
    setTimeout(() => {
      let content = '';
      
      switch (contentType) {
        case 'quiz':
          content = generateQuizContent(selectedTopic);
          break;
        case 'notes':
          content = generateNotesContent(selectedTopic);
          break;
        case 'materials':
          content = generateMaterialsContent(selectedTopic);
          break;
        case 'questions':
          content = generateQuestionsContent(selectedTopic);
          break;
        default:
          content = 'No content generated';
      }
      
      setGeneratedContent(content);
      setIsGenerating(false);
    }, 1500);
  };
  
  const generateQuizContent = (topic) => {
    return `
      <h3>Quiz: ${topic}</h3>
      <div class="quiz-question">
        <p>1. What is the standard form of a quadratic equation?</p>
        <div class="quiz-options">
          <div class="option">A. ax + b = 0</div>
          <div class="option">B. ax² + bx + c = 0</div>
          <div class="option">C. ax³ + bx² + cx + d = 0</div>
          <div class="option">D. a/x + b = 0</div>
        </div>
      </div>
      <div class="quiz-question">
        <p>2. Which of the following is a solution to x² - 5x + 6 = 0?</p>
        <div class="quiz-options">
          <div class="option">A. x = 1, x = 6</div>
          <div class="option">B. x = 2, x = 3</div>
          <div class="option">C. x = -2, x = -3</div>
          <div class="option">D. x = 0, x = 5</div>
        </div>
      </div>
      <div class="quiz-question">
        <p>3. The discriminant of a quadratic equation ax² + bx + c = 0 is:</p>
        <div class="quiz-options">
          <div class="option">A. b² - 4ac</div>
          <div class="option">B. b² + 4ac</div>
          <div class="option">C. 4ac - b²</div>
          <div class="option">D. a² - 4bc</div>
        </div>
      </div>
    `;
  };
  
  const generateNotesContent = (topic) => {
    return `
      <h3>Notes: ${topic}</h3>
      <div class="notes-content">
        <div class="important-formula">
          <h4>Important Formula</h4>
          <p>For a quadratic equation ax² + bx + c = 0, the solutions are:</p>
          <div class="formula">x = (-b ± √(b² - 4ac)) / 2a</div>
        </div>
        <div class="key-points">
          <h4>Key Points</h4>
          <ul>
            <li>A quadratic equation has two solutions (roots)</li>
            <li>The discriminant (b² - 4ac) determines the nature of the roots</li>
            <li>If discriminant > 0: Two distinct real roots</li>
            <li>If discriminant = 0: One real root (repeated)</li>
            <li>If discriminant < 0: Two complex conjugate roots</li>
          </ul>
        </div>
      </div>
    `;
  };
  
  const generateMaterialsContent = (topic) => {
    return `
      <h3>Study Materials: ${topic}</h3>
      <div class="materials-content">
        <div class="definition">
          <h4>Definition</h4>
          <p>A quadratic equation is a polynomial equation of the second degree. The general form is ax² + bx + c = 0, where a, b, and c are coefficients and a ≠ 0.</p>
        </div>
        <div class="example">
          <h4>Example</h4>
          <p>Solve the quadratic equation: 2x² - 7x + 3 = 0</p>
          <p>Using the quadratic formula:</p>
          <p>x = (7 ± √((-7)² - 4(2)(3))) / (2 × 2)</p>
          <p>x = (7 ± √(49 - 24)) / 4</p>
          <p>x = (7 ± √25) / 4</p>
          <p>x = (7 ± 5) / 4</p>
          <p>So, x = (7 + 5)/4 = 3 or x = (7 - 5)/4 = 0.5</p>
        </div>
        <div class="important-points">
          <h4>Important Points</h4>
          <ul>
            <li><u>Vertex form</u>: a(x - h)² + k, where (h, k) is the vertex</li>
            <li><u>Factored form</u>: a(x - r₁)(x - r₂), where r₁ and r₂ are the roots</li>
            <li>The graph of a quadratic function is a parabola</li>
          </ul>
        </div>
      </div>
    `;
  };
  
  const generateQuestionsContent = (topic) => {
    return `
      <h3>Important Questions: ${topic}</h3>
      <div class="questions-content">
        <div class="question">
          <p>1. Find the roots of the equation x² - 3x - 10 = 0 by factorization.</p>
        </div>
        <div class="question">
          <p>2. Solve the quadratic equation 2x² + x - 6 = 0 using the quadratic formula.</p>
        </div>
        <div class="question">
          <p>3. For what value of k does the equation (k+1)x² - 6(k+1)x + 3(k+9) = 0 have equal roots?</p>
        </div>
        <div class="question">
          <p>4. If α and β are the roots of the equation x² - 5x + 6 = 0, find the value of α² + β².</p>
        </div>
        <div class="question">
          <p>5. Find the nature of the roots of the equation 3x² - 2√6x + 2 = 0 without solving.</p>
        </div>
      </div>
    `;
  };
  
  const saveContent = () => {
    // In a real app, this would save the content to a file or database
    alert('Content saved successfully!');
  };
  
  const downloadPDF = () => {
    // In a real app, this would generate and download a PDF
    alert('PDF download started!');
  };
  
  const resetForm = () => {
    setFile(null);
    setFileName('');
    setFileType('');
    setTopics([]);
    setSelectedTopic('');
    setContentType('');
    setGeneratedContent('');
  };
  
  const getFileIcon = () => {
    switch (fileType) {
      case 'pdf':
        return <FaFilePdf className="file-icon pdf" />;
      case 'image':
        return <FaFileImage className="file-icon image" />;
      case 'text':
        return <FaFileAlt className="file-icon text" />;
      default:
        return <FaFileAlt className="file-icon" />;
    }
  };
  
  return (
    <div className="file-upload">
      <h2 className="page-title">Upload & Analyze Files</h2>
      
      <div className="upload-container">
        <div className="upload-section">
          <h3>Upload File</h3>
          <div className="upload-area">
            <label htmlFor="file-upload" className="upload-label">
              <FaUpload />
              <span>Click to upload or drag and drop</span>
              <span className="upload-subtitle">PDF, Image, Text files (Max 10MB)</span>
            </label>
            <input 
              id="file-upload"
              type="file" 
              onChange={handleFileChange}
              className="file-input"
            />
          </div>
          
          {file && (
            <div className="file-info">
              <div className="file-details">
                {getFileIcon()}
                <div className="file-name">{fileName}</div>
                <button className="remove-file" onClick={() => setFile(null)}>
                  <FaTimes />
                </button>
              </div>
              <button className="analyze-btn" onClick={analyzeFile} disabled={isAnalyzing}>
                {isAnalyzing ? 'Analyzing...' : 'Analyze File'}
              </button>
            </div>
          )}
        </div>
        
        {topics.length > 0 && (
          <div className="topics-section">
            <h3>Extracted Topics</h3>
            <div className="topics-list">
              {topics.map((topic, index) => (
                <div 
                  key={index} 
                  className={`topic-item ${selectedTopic === topic ? 'selected' : ''}`}
                  onClick={() => setSelectedTopic(topic)}
                >
                  {topic}
                </div>
              ))}
            </div>
            
            {selectedTopic && (
              <div className="content-generation">
                <h3>Generate Content for: {selectedTopic}</h3>
                <div className="content-types">
                  <div 
                    className={`content-type ${contentType === 'quiz' ? 'selected' : ''}`}
                    onClick={() => setContentType('quiz')}
                  >
                    Quiz
                  </div>
                  <div 
                    className={`content-type ${contentType === 'notes' ? 'selected' : ''}`}
                    onClick={() => setContentType('notes')}
                  >
                    Sticky Notes
                  </div>
                  <div 
                    className={`content-type ${contentType === 'materials' ? 'selected' : ''}`}
                    onClick={() => setContentType('materials')}
                  >
                    Study Materials
                  </div>
                  <div 
                    className={`content-type ${contentType === 'questions' ? 'selected' : ''}`}
                    onClick={() => setContentType('questions')}
                  >
                    Important Questions
                  </div>
                </div>
                
                <button 
                  className="generate-btn" 
                  onClick={generateContent}
                  disabled={!contentType || isGenerating}
                >
                  {isGenerating ? 'Generating...' : 'Generate Content'}
                </button>
              </div>
            )}
          </div>
        )}
        
        {generatedContent && (
          <div className="generated-content">
            <h3>Generated Content</h3>
            <div 
              className="content-preview"
              dangerouslySetInnerHTML={{ __html: generatedContent }}
            ></div>
            <div className="content-actions">
              <button className="action-btn" onClick={saveContent}>
                Save
              </button>
              <button className="action-btn" onClick={downloadPDF}>
                Download as PDF
              </button>
              <button className="action-btn reset" onClick={resetForm}>
                Reset
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload;