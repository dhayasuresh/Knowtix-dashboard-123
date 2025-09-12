// components/Quiz.js
import React, { useState, useEffect } from 'react';
import { FaArrowLeft, FaArrowRight, FaCheck, FaClock } from 'react-icons/fa';

const Quiz = ({ subject, onExit, darkMode }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes in seconds
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);
  
  useEffect(() => {
    // Generate sample questions
    const sampleQuestions = Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      text: `Question ${i + 1}: This is a sample ${subject} question about topic ${i % 5 + 1}.`,
      options: [
        `Option A for question ${i + 1}`,
        `Option B for question ${i + 1}`,
        `Option C for question ${i + 1}`,
        `Option D for question ${i + 1}`
      ],
      correctAnswer: i % 4
    }));
    
    setQuestions(sampleQuestions);
  }, [subject]);
  
  useEffect(() => {
    if (timeLeft <= 0) {
      handleSubmitQuiz();
      return;
    }
    
    const timerId = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    
    return () => clearTimeout(timerId);
  }, [timeLeft]);
  
  const handleAnswerSelect = (optionIndex) => {
    setAnswers({
      ...answers,
      [currentQuestion]: optionIndex
    });
  };
  
  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };
  
  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };
  
  const handleSubmitQuiz = () => {
    // Calculate score
    let calculatedScore = 0;
    questions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        calculatedScore += 1;
      }
    });
    
    setScore(calculatedScore);
    setQuizCompleted(true);
  };
  
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  if (quizCompleted) {
    return (
      <div className={`quiz-results ${darkMode ? 'dark' : ''}`}>
        <div className="results-header">
          <h2>Quiz Results</h2>
          <p>{subject}</p>
        </div>
        
        <div className="score-display">
          <div className="score-circle">
            <span>{score}</span>
            <span>/ {questions.length}</span>
          </div>
          <p>
            {score >= questions.length * 0.8 ? 'Excellent!' : 
             score >= questions.length * 0.6 ? 'Good job!' : 
             'Keep practicing!'}
          </p>
        </div>
        
        <div className="results-actions">
          <button onClick={onExit}>Back to Subjects</button>
          <button>Review Answers</button>
          <button>Try Again</button>
        </div>
      </div>
    );
  }
  
  if (questions.length === 0) {
    return (
      <div className={`quiz-loading ${darkMode ? 'dark' : ''}`}>
        <div className="spinner"></div>
        <p>Loading questions...</p>
      </div>
    );
  }
  
  const question = questions[currentQuestion];
  
  return (
    <div className={`quiz-container ${darkMode ? 'dark' : ''}`}>
      <div className="quiz-header">
        <button className="exit-btn" onClick={onExit}>
          <FaArrowLeft /> Exit
        </button>
        <div className="quiz-timer">
          <FaClock /> {formatTime(timeLeft)}
        </div>
      </div>
      
      <div className="quiz-progress">
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
        <p>Question {currentQuestion + 1} of {questions.length}</p>
      </div>
      
      <div className="question-container">
        <h3>{question.text}</h3>
        
        <div className="options-container">
          {question.options.map((option, index) => (
            <div 
              key={index}
              className={`option ${answers[currentQuestion] === index ? 'selected' : ''}`}
              onClick={() => handleAnswerSelect(index)}
            >
              <span className="option-label">{String.fromCharCode(65 + index)}</span>
              <span className="option-text">{option}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="quiz-navigation">
        <button 
          className="prev-btn" 
          onClick={handlePrevQuestion}
          disabled={currentQuestion === 0}
        >
          <FaArrowLeft /> Previous
        </button>
        
        {currentQuestion === questions.length - 1 ? (
          <button className="submit-btn" onClick={handleSubmitQuiz}>
            <FaCheck /> Submit Quiz
          </button>
        ) : (
          <button 
            className="next-btn" 
            onClick={handleNextQuestion}
            disabled={answers[currentQuestion] === undefined}
          >
            Next <FaArrowRight />
          </button>
        )}
      </div>
    </div>
  );
};

export default Quiz;