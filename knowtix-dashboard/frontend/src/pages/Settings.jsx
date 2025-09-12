// components/Settings.js
import React, { useState } from 'react';
import { FaUser, FaLock, FaMoon, FaSun, FaBell, FaMicrophone, FaSave, FaHistory, FaDownload } from 'react-icons/fa';

const Settings = ({ darkMode, toggleDarkMode, voiceCommandsEnabled, setVoiceCommandsEnabled }) => {
  const [activeTab, setActiveTab] = useState('general');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(true);
  const [studyRemindersEnabled, setStudyRemindersEnabled] = useState(true);
  const [profileData, setProfileData] = useState({
    name: 'Student',
    email: 'student@example.com',
    id: '2024001',
    grade: '12'
  });
  
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const saveProfile = () => {
    // In a real app, this would save the profile data to a backend
    alert('Profile saved successfully!');
  };
  
  const changePassword = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }
    
    // In a real app, this would update the password
    alert('Password changed successfully!');
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };
  
  const backupData = () => {
    // In a real app, this would initiate a data backup
    alert('Data backup started!');
  };
  
  const downloadHistory = () => {
    // In a real app, this would download the deletion history
    alert('Downloading deletion history...');
  };
  
  const voiceCommands = [
    { command: 'Go to dashboard', description: 'Navigate to dashboard' },
    { command: 'Go to materials', description: 'Navigate to study materials' },
    { command: 'Go to quiz', description: 'Navigate to assessments' },
    { command: 'Go to notes', description: 'Navigate to sticky notes' },
    { command: 'Go to calendar', description: 'Navigate to calendar' },
    { command: 'Go to collaboration', description: 'Navigate to collaboration' },
    { command: 'Go to timer', description: 'Navigate to study timer' },
    { command: 'Go to math tools', description: 'Navigate to math tools' },
    { command: 'Go to AI content', description: 'Navigate to AI content generator' },
    { command: 'Go to settings', description: 'Navigate to settings' },
    { command: 'Create folder', description: 'Create a new folder' },
    { command: 'New note', description: 'Create a new sticky note' },
    { command: 'Start quiz', description: 'Start a new quiz' },
    { command: 'Dark mode', description: 'Enable dark theme' },
    { command: 'Light mode', description: 'Enable light theme' }
  ];
  
  return (
    <div className="settings">
      <div className="settings-header">
        <h2 className="page-title">Settings</h2>
      </div>
      
      <div className="settings-container">
        <div className="settings-sidebar">
          <div className="settings-tabs">
            <button 
              className={`settings-tab ${activeTab === 'general' ? 'active' : ''}`}
              onClick={() => setActiveTab('general')}
            >
              General
            </button>
            <button 
              className={`settings-tab ${activeTab === 'account' ? 'active' : ''}`}
              onClick={() => setActiveTab('account')}
            >
              Account
            </button>
            <button 
              className={`settings-tab ${activeTab === 'voice' ? 'active' : ''}`}
              onClick={() => setActiveTab('voice')}
            >
              Voice Commands
            </button>
            <button 
              className={`settings-tab ${activeTab === 'data' ? 'active' : ''}`}
              onClick={() => setActiveTab('data')}
            >
              Data Management
            </button>
          </div>
        </div>
        
        <div className="settings-content">
          {activeTab === 'general' && (
            <div className="settings-section">
              <h3>General Settings</h3>
              
              <div className="setting-item">
                <div className="setting-info">
                  <div className="setting-title">
                    {darkMode ? <FaMoon /> : <FaSun />}
                    Dark Mode
                  </div>
                  <p>Enable dark theme for the application</p>
                </div>
                <div className="setting-control">
                  <label className="toggle-switch">
                    <input 
                      type="checkbox" 
                      checked={darkMode}
                      onChange={toggleDarkMode}
                    />
                    <span className="slider"></span>
                  </label>
                </div>
              </div>
              
              <div className="setting-item">
                <div className="setting-info">
                  <div className="setting-title">
                    <FaBell />
                    Notifications
                  </div>
                  <p>Enable notifications for reminders and updates</p>
                </div>
                <div className="setting-control">
                  <label className="toggle-switch">
                    <input 
                      type="checkbox" 
                      checked={notificationsEnabled}
                      onChange={() => setNotificationsEnabled(!notificationsEnabled)}
                    />
                    <span className="slider"></span>
                  </label>
                </div>
              </div>
              
              <div className="setting-item">
                <div className="setting-info">
                  <div className="setting-title">
                    <FaMicrophone />
                    Voice Commands
                  </div>
                  <p>Enable voice commands for navigation</p>
                </div>
                <div className="setting-control">
                  <label className="toggle-switch">
                    <input 
                      type="checkbox" 
                      checked={voiceCommandsEnabled}
                      onChange={() => setVoiceCommandsEnabled(!voiceCommandsEnabled)}
                    />
                    <span className="slider"></span>
                  </label>
                </div>
              </div>
              
              <div className="setting-item">
                <div className="setting-info">
                  <div className="setting-title">
                    <FaSave />
                    Auto Save
                  </div>
                  <p>Automatically save your work</p>
                </div>
                <div className="setting-control">
                  <label className="toggle-switch">
                    <input 
                      type="checkbox" 
                      checked={autoSaveEnabled}
                      onChange={() => setAutoSaveEnabled(!autoSaveEnabled)}
                    />
                    <span className="slider"></span>
                  </label>
                </div>
              </div>
              
              <div className="setting-item">
                <div className="setting-info">
                  <div className="setting-title">
                    <FaBell />
                    Study Reminders
                  </div>
                  <p>Enable study session reminders</p>
                </div>
                <div className="setting-control">
                  <label className="toggle-switch">
                    <input 
                      type="checkbox" 
                      checked={studyRemindersEnabled}
                      onChange={() => setStudyRemindersEnabled(!studyRemindersEnabled)}
                    />
                    <span className="slider"></span>
                  </label>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'account' && (
            <div className="settings-section">
              <h3>Account Settings</h3>
              
              <div className="account-info">
                <div className="profile-header">
                  <div className="profile-avatar">
                    <FaUser />
                  </div>
                  <div className="profile-details">
                    <h4>{profileData.name}</h4>
                    <p>Student • ID: {profileData.id}</p>
                  </div>
                </div>
                
                <div className="profile-form">
                  <h4>Edit Profile</h4>
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name"
                      value={profileData.name}
                      onChange={handleProfileChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email"
                      value={profileData.email}
                      onChange={handleProfileChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="id">Student ID</label>
                    <input 
                      type="text" 
                      id="id" 
                      name="id"
                      value={profileData.id}
                      onChange={handleProfileChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="grade">Grade</label>
                    <input 
                      type="text" 
                      id="grade" 
                      name="grade"
                      value={profileData.grade}
                      onChange={handleProfileChange}
                    />
                  </div>
                  <button className="save-btn" onClick={saveProfile}>
                    Save Changes
                  </button>
                </div>
                
                <div className="password-form">
                  <h4>Change Password</h4>
                  <div className="form-group">
                    <label htmlFor="current-password">Current Password</label>
                    <input 
                      type="password" 
                      id="current-password" 
                      name="currentPassword"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="new-password">New Password</label>
                    <input 
                      type="password" 
                      id="new-password" 
                      name="newPassword"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="confirm-password">Confirm New Password</label>
                    <input 
                      type="password" 
                      id="confirm-password" 
                      name="confirmPassword"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                    />
                  </div>
                  <button className="save-btn" onClick={changePassword}>
                    Change Password
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'voice' && (
            <div className="settings-section">
              <h3>Voice Commands</h3>
              
              <div className="voice-commands-intro">
                <p>Try saying any of the following commands to navigate the application:</p>
                <div className="voice-try">
                  <button className="voice-try-btn">
                    <FaMicrophone /> Try Voice Command
                  </button>
                </div>
              </div>
              
              <div className="voice-commands-list">
                <h4>Available Commands:</h4>
                <div className="commands-grid">
                  {voiceCommands.map((cmd, index) => (
                    <div key={index} className="command-item">
                      <div className="command-text">"{cmd.command}"</div>
                      <div className="command-description">{cmd.description}</div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="voice-settings">
                <h4>Voice Settings</h4>
                <div className="setting-item">
                  <div className="setting-info">
                    <div className="setting-title">
                      <FaMicrophone />
                      Voice Commands
                    </div>
                    <p>Enable voice commands for navigation</p>
                  </div>
                  <div className="setting-control">
                    <label className="toggle-switch">
                      <input 
                        type="checkbox" 
                        checked={voiceCommandsEnabled}
                        onChange={() => setVoiceCommandsEnabled(!voiceCommandsEnabled)}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>
                </div>
                
                <div className="setting-item">
                  <div className="setting-info">
                    <div className="setting-title">
                      <FaBell />
                      Voice Feedback
                    </div>
                    <p>Enable voice feedback for actions</p>
                  </div>
                  <div className="setting-control">
                    <label className="toggle-switch">
                      <input type="checkbox" />
                      <span className="slider"></span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'data' && (
            <div className="settings-section">
              <h3>Data Management</h3>
              
              <div className="data-management">
                <div className="data-section">
                  <h4>Backup Data</h4>
                  <p>Create a backup of all your data including files, notes, and settings</p>
                  <button className="data-action-btn" onClick={backupData}>
                    <FaDownload /> Backup Now
                  </button>
                </div>
                
                <div className="data-section">
                  <h4>Deletion History</h4>
                  <p>View and download history of deleted files and content</p>
                  <button className="data-action-btn" onClick={downloadHistory}>
                    <FaHistory /> Download History
                  </button>
                </div>
                
                <div className="data-section">
                  <h4>Storage Usage</h4>
                  <div className="storage-info">
                    <div className="storage-bar">
                      <div className="storage-used" style={{ width: '45%' }}></div>
                    </div>
                    <div className="storage-details">
                      <span>4.5 GB of 10 GB used</span>
                      <span>45%</span>
                    </div>
                  </div>
                </div>
                
                <div className="data-section">
                  <h4>Danger Zone</h4>
                  <p>These actions are irreversible. Please proceed with caution.</p>
                  <div className="danger-actions">
                    <button className="danger-btn">Clear All Data</button>
                    <button className="danger-btn">Delete Account</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;