// components/Header.js
import React, { useState } from 'react';
import { FaBell, FaUserCircle, FaSun, FaMoon, FaMicrophone } from 'react-icons/fa';

const Header = ({ darkMode, toggleDarkMode, voiceCommandsEnabled, setVoiceCommandsEnabled }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  return (
    <header className="header">
      <div className="logo">
        <h1>Knowtix</h1>
      </div>
      
      <div className="header-actions">
        <button 
          className={`voice-toggle ${voiceCommandsEnabled ? 'active' : ''}`}
          onClick={() => setVoiceCommandsEnabled(!voiceCommandsEnabled)}
          title="Toggle Voice Commands"
        >
          <FaMicrophone />
        </button>
        
        <button 
          className="theme-toggle" 
          onClick={toggleDarkMode}
          title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>
        
        <div className="notification-container">
          <button 
            className="notification-btn"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <FaBell />
            <span className="notification-badge">3</span>
          </button>
          
          {showNotifications && (
            <div className="notification-dropdown">
              <div className="notification-item">
                <p>New study material available for Mathematics</p>
                <span className="notification-time">2 hours ago</span>
              </div>
              <div className="notification-item">
                <p>Your Physics test is scheduled for tomorrow</p>
                <span className="notification-time">5 hours ago</span>
              </div>
              <div className="notification-item">
                <p>Weekly progress report is ready</p>
                <span className="notification-time">1 day ago</span>
              </div>
            </div>
          )}
        </div>
        
        <div className="profile-container">
          <button 
            className="profile-btn"
            onClick={() => setShowProfile(!showProfile)}
          >
            <FaUserCircle />
          </button>
          
          {showProfile && (
            <div className="profile-dropdown">
              <div className="profile-info">
                <h3>Student</h3>
                <p>ID: 2024001</p>
              </div>
              <div className="profile-actions">
                <button>Edit Profile</button>
                <button>Change Password</button>
                <button>Logout</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;