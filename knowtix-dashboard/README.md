// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './pages/Sidebar';
import Dashboard from './pages/Dashboard';
import FileUpload from './pages/FileUpload';
import MyFiles from './pages/MyFiles';
import Assessments from './pages/Assessments';
import Collaboration from './pages/Collaboration';
import Formulas from './pages/Formulas';
import AIContent from './pages/AIContent';
import Settings from './pages/Settings';
import VoiceAssistant from './components/VoiceAssistant';
import NotificationSystem from './components/NotificationSystem';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import { AuthProvider } from '../src/hooks/useAuth';
import '../src/pages/App.css';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [voiceCommandsEnabled, setVoiceCommandsEnabled] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [autoSave, setAutoSave] = useState(true);
  const [studyReminders, setStudyReminders] = useState(true);

  useEffect(() => {
    // Apply dark mode class to body
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  return (
    <AuthProvider>
      <Router>
        <div className={`app-container ${darkMode ? 'dark' : ''}`}>
          <Routes>
            {/* Public routes (login, signup, forgot-password) */}
            <Route path="/login" element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            } />
            <Route path="/signup" element={
              <PublicRoute>
                <Signup />
              </PublicRoute>
            } />
            <Route path="/forgot-password" element={
              <PublicRoute>
                <ForgotPassword />
              </PublicRoute>
            } />
            
            {/* Protected routes (require authentication) */}
            <Route path="/*" element={
              <ProtectedRoute>
                <div className="main-content">
                  <div className="header">
                    <div className="header-left">
                      <h1>Knowtix</h1>
                    </div>
                    <div className="header-right">
                      <NotificationSystem enabled={notificationsEnabled} />
                      <div className="profile-icon">
                        <img src="https://randomuser.me/api/portraits/men/1.jpg" alt="Profile" />
                      </div>
                    </div>
                  </div>
                  
                  <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/upload" element={<FileUpload />} />
                    <Route path="/my-files" element={<MyFiles />} />
                    <Route path="/assessments" element={<Assessments />} />
                    <Route path="/collaboration" element={<Collaboration />} />
                    <Route path="/formulas" element={<Formulas />} />
                    <Route path="/ai-content" element={<AIContent />} />
                    <Route path="/settings" element={
                      <Settings 
                        darkMode={darkMode} 
                        setDarkMode={setDarkMode}
                        voiceCommandsEnabled={voiceCommandsEnabled}
                        setVoiceCommandsEnabled={setVoiceCommandsEnabled}
                        notificationsEnabled={notificationsEnabled}
                        setNotificationsEnabled={setNotificationsEnabled}
                        autoSave={autoSave}
                        setAutoSave={setAutoSave}
                        studyReminders={studyReminders}
                        setStudyReminders={setStudyReminders}
                      />
                    } />
                    <Route path="/" element={<Navigate to="/dashboard" replace />} />
                  </Routes>
                </div>
                <Sidebar />
              </ProtectedRoute>
            } />
          </Routes>
          
          {voiceCommandsEnabled && <VoiceAssistant />}
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;