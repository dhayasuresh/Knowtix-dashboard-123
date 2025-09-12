// components/Assessments.js
import React, { useState, useEffect } from 'react';
import { FaClipboardList, FaCalendarAlt, FaPlay, FaCheck, FaClock, FaSpinner } from 'react-icons/fa';

const Assessments = () => {
  const [activeTab, setActiveTab] = useState('tests');
  const [tests, setTests] = useState([
    { id: 1, subject: 'Mathematics', questions: 20, duration: '30 min', date: '2023-06-15', status: 'pending' },
    { id: 2, subject: 'Physics', questions: 25, duration: '45 min', date: '2023-06-18', status: 'pending' },
    { id: 3, subject: 'Chemistry', questions: 30, duration: '60 min', date: '2023-06-22', status: 'pending' },
    { id: 4, subject: 'Biology', questions: 20, duration: '40 min', date: '2023-06-25', status: 'pending' },
    { id: 5, subject: 'English', questions: 15, duration: '30 min', date: '2023-06-28', status: 'pending' }
  ]);
  
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Complete Math Assignment', subject: 'Mathematics', dueDate: '2023-06-10', status: 'ongoing' },
    { id: 2, title: 'Physics Lab Report', subject: 'Physics', dueDate: '2023-06-12', status: 'ongoing' },
    { id: 3, title: 'Chemistry Project', subject: 'Chemistry', dueDate: '2023-06-15', status: 'pending' },
    { id: 4, title: 'Biology Notes', subject: 'Biology', dueDate: '2023-06-05', status: 'completed' },
    { id: 5, title: 'English Essay', subject: 'English', dueDate: '2023-06-08', status: 'completed' }
  ]);
  
  const [activeTest, setActiveTest] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [testCompleted, setTestCompleted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  
  // Sample questions for a test
  const sampleQuestions = [
    {
      id: 1,
      question: "What is the solution to the equation 2x + 5 = 15?",
      options: ["x = 5", "x = 10", "x = 7.5", "x = 2.5"],
      correctAnswer: 0
    },
    {
      id: 2,
      question: "Which of the following is a quadratic equation?",
      options: ["x + 2 = 0", "x² + 2x + 1 = 0", "x³ + 2x² + x = 0", "1/x = 2"],
      correctAnswer: 1
    },
    {
      id: 3,
      question: "What is the value of π (pi) approximately?",
      options: ["3.14", "2.71", "1.41", "1.62"],
      correctAnswer: 0
    },
    {
      id: 4,
      question: "Which of the following is NOT a prime number?",
      options: ["2", "3", "5", "9"],
      correctAnswer: 3
    },
    {
      id: 5,
      question: "What is the area of a circle with radius 5 units?",
      options: ["25π", "10π", "5π", "50π"],
      correctAnswer: 0
    }
  ];
  
  useEffect(() => {
    let interval = null;
    
    if (timerActive && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(prev => prev - 1);
      }, 1000);
    } else if (timerActive && timeRemaining === 0) {
      // Time's up
      setTimerActive(false);
      completeTest();
    }
    
    return () => clearInterval(interval);
  }, [timerActive, timeRemaining]);
  
  const startTest = (test) => {
    setActiveTest(test);
    setCurrentQuestion(0);
    setAnswers({});
    setTestCompleted(false);
    
    // Set timer based on test duration (converting minutes to seconds)
    const duration = parseInt(test.duration.split(' ')[0]);
    setTimeRemaining(duration * 60);
    setTimerActive(true);
  };
  
  const handleAnswerSelect = (questionId, optionIndex) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };
  
  const nextQuestion = () => {
    if (currentQuestion < sampleQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      // Last question, complete the test
      completeTest();
    }
  };
  
  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };
  
  const completeTest = () => {
    setTimerActive(false);
    setTestCompleted(true);
    
    // Update test status
    setTests(prev => 
      prev.map(test => 
        test.id === activeTest.id ? { ...test, status: 'completed' } : test
      )
    );
  };
  
  const exitTest = () => {
    setActiveTest(null);
    setTimerActive(false);
  };
  
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  const calculateScore = () => {
    let correct = 0;
    sampleQuestions.forEach(question => {
      if (answers[question.id] === question.correctAnswer) {
        correct++;
      }
    });
    return Math.round((correct / sampleQuestions.length) * 100);
  };
  
  const updateTaskStatus = (taskId, newStatus) => {
    setTasks(prev => 
      prev.map(task => 
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };
  
  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <FaCheck className="status-icon completed" />;
      case 'ongoing':
        return <FaClock className="status-icon ongoing" />;
      case 'pending':
        return <FaClock className="status-icon pending" />;
      default:
        return null;
    }
  };
  
  return (
    <div className="assessments">
      <div className="assessments-header">
        <h2 className="page-title">Assessments</h2>
        <div className="tabs">
          <button 
            className={`tab ${activeTab === 'tests' ? 'active' : ''}`}
            onClick={() => setActiveTab('tests')}
          >
            Tests
          </button>
          <button 
            className={`tab ${activeTab === 'calendar' ? 'active' : ''}`}
            onClick={() => setActiveTab('calendar')}
          >
            Calendar
          </button>
          <button 
            className={`tab ${activeTab === 'tasks' ? 'active' : ''}`}
            onClick={() => setActiveTab('tasks')}
          >
            Tasks
          </button>
        </div>
      </div>
      
      {activeTab === 'tests' && (
        <div className="tests-container">
          {!activeTest ? (
            <div className="tests-list">
              <h3>Available Tests</h3>
              <div className="test-cards">
                {tests.map(test => (
                  <div key={test.id} className="test-card">
                    <div className="test-info">
                      <h4>{test.subject}</h4>
                      <div className="test-meta">
                        <span>{test.questions} questions</span>
                        <span>{test.duration}</span>
                        <span>{test.date}</span>
                      </div>
                    </div>
                    <div className="test-status">
                      <span className={`status-badge ${test.status}`}>{test.status}</span>
                      {test.status === 'pending' && (
                        <button 
                          className="start-test-btn"
                          onClick={() => startTest(test)}
                        >
                          <FaPlay /> Start
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="test-taking">
              <div className="test-header">
                <h3>{activeTest.subject} Test</h3>
                <div className="test-timer">
                  <FaClock />
                  <span>{formatTime(timeRemaining)}</span>
                </div>
                <button className="exit-test-btn" onClick={exitTest}>
                  Exit Test
                </button>
              </div>
              
              {!testCompleted ? (
                <div className="test-content">
                  <div className="question-counter">
                    Question {currentQuestion + 1} of {sampleQuestions.length}
                  </div>
                  
                  <div className="question-container">
                    <h4 className="question-text">
                      {sampleQuestions[currentQuestion].question}
                    </h4>
                    
                    <div className="options-container">
                      {sampleQuestions[currentQuestion].options.map((option, index) => (
                        <div 
                          key={index}
                          className={`option ${answers[sampleQuestions[currentQuestion].id] === index ? 'selected' : ''}`}
                          onClick={() => handleAnswerSelect(sampleQuestions[currentQuestion].id, index)}
                        >
                          {option}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="test-navigation">
                    <button 
                      className="nav-btn prev"
                      onClick={prevQuestion}
                      disabled={currentQuestion === 0}
                    >
                      Previous
                    </button>
                    <button 
                      className="nav-btn next"
                      onClick={nextQuestion}
                    >
                      {currentQuestion === sampleQuestions.length - 1 ? 'Finish' : 'Next'}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="test-results">
                  <h3>Test Completed!</h3>
                  <div className="score-display">
                    <div className="score-circle">
                      {calculateScore()}%
                    </div>
                    <p>Your Score</p>
                  </div>
                  
                  <div className="results-summary">
                    <div className="summary-item">
                      <span>Correct Answers:</span>
                      <span>
                        {Object.keys(answers).filter(qId => 
                          answers[qId] === sampleQuestions.find(q => q.id === parseInt(qId)).correctAnswer
                        ).length} / {sampleQuestions.length}
                      </span>
                    </div>
                    <div className="summary-item">
                      <span>Time Taken:</span>
                      <span>{formatTime(parseInt(activeTest.duration.split(' ')[0]) * 60 - timeRemaining)}</span>
                    </div>
                  </div>
                  
                  <button className="exit-test-btn" onClick={exitTest}>
                    Back to Tests
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
      
      {activeTab === 'calendar' && (
        <div className="calendar-container">
          <h3>Exam Calendar</h3>
          <div className="calendar-view">
            <div className="calendar-header">
              <h4>June 2023</h4>
              <div className="calendar-nav">
                <button className="calendar-nav-btn">Prev</button>
                <button className="calendar-nav-btn">Today</button>
                <button className="calendar-nav-btn">Next</button>
              </div>
            </div>
            
            <div className="calendar-grid">
              <div className="calendar-weekdays">
                <div>Sun</div>
                <div>Mon</div>
                <div>Tue</div>
                <div>Wed</div>
                <div>Thu</div>
                <div>Fri</div>
                <div>Sat</div>
              </div>
              
              <div className="calendar-days">
                {/* Empty cells for days before the first day of the month */}
                <div className="calendar-day empty"></div>
                <div className="calendar-day empty"></div>
                <div className="calendar-day empty"></div>
                <div className="calendar-day empty"></div>
                
                {/* Days of the month */}
                {[...Array(30)].map((_, index) => {
                  const day = index + 1;
                  const hasExam = tests.some(test => {
                    const testDay = parseInt(test.date.split('-')[2]);
                    return testDay === day;
                  });
                  
                  return (
                    <div key={day} className={`calendar-day ${hasExam ? 'has-exam' : ''}`}>
                      <div className="day-number">{day}</div>
                      {hasExam && (
                        <div className="exam-indicator">
                          <FaCalendarAlt />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
            
            <div className="upcoming-exams">
              <h4>Upcoming Exams</h4>
              <div className="exam-list">
                {tests
                  .filter(test => test.status === 'pending')
                  .map(test => (
                    <div key={test.id} className="exam-item">
                      <div className="exam-date">{test.date}</div>
                      <div className="exam-subject">{test.subject}</div>
                      <div className="exam-time">{test.duration}</div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}
      
      {activeTab === 'tasks' && (
        <div className="tasks-container">
          <h3>Task Management</h3>
          
          <div className="task-filters">
            <button className="filter-btn active">All</button>
            <button className="filter-btn">Ongoing</button>
            <button className="filter-btn">Pending</button>
            <button className="filter-btn">Completed</button>
          </div>
          
          <div className="task-columns">
            <div className="task-column">
              <h4>Ongoing</h4>
              <div className="task-list">
                {tasks
                  .filter(task => task.status === 'ongoing')
                  .map(task => (
                    <div key={task.id} className="task-card">
                      <div className="task-header">
                        <h5>{task.title}</h5>
                        {getStatusIcon(task.status)}
                      </div>
                      <div className="task-meta">
                        <span>{task.subject}</span>
                        <span>Due: {task.dueDate}</span>
                      </div>
                      <div className="task-actions">
                        <button 
                          className="task-action-btn"
                          onClick={() => updateTaskStatus(task.id, 'completed')}
                        >
                          Mark Complete
                        </button>
                        <button 
                          className="task-action-btn"
                          onClick={() => updateTaskStatus(task.id, 'pending')}
                        >
                          Move to Pending
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            
            <div className="task-column">
              <h4>Pending</h4>
              <div className="task-list">
                {tasks
                  .filter(task => task.status === 'pending')
                  .map(task => (
                    <div key={task.id} className="task-card">
                      <div className="task-header">
                        <h5>{task.title}</h5>
                        {getStatusIcon(task.status)}
                      </div>
                      <div className="task-meta">
                        <span>{task.subject}</span>
                        <span>Due: {task.dueDate}</span>
                      </div>
                      <div className="task-actions">
                        <button 
                          className="task-action-btn"
                          onClick={() => updateTaskStatus(task.id, 'ongoing')}
                        >
                          Start Task
                        </button>
                        <button 
                          className="task-action-btn"
                          onClick={() => updateTaskStatus(task.id, 'completed')}
                        >
                          Mark Complete
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            
            <div className="task-column">
              <h4>Completed</h4>
              <div className="task-list">
                {tasks
                  .filter(task => task.status === 'completed')
                  .map(task => (
                    <div key={task.id} className="task-card">
                      <div className="task-header">
                        <h5>{task.title}</h5>
                        {getStatusIcon(task.status)}
                      </div>
                      <div className="task-meta">
                        <span>{task.subject}</span>
                        <span>Completed</span>
                      </div>
                      <div className="task-actions">
                        <button 
                          className="task-action-btn"
                          onClick={() => updateTaskStatus(task.id, 'ongoing')}
                        >
                          Reopen
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Assessments;