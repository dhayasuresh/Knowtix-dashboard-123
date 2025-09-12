// components/Header.js
import React from 'react';
import { FaBell, FaUserCircle, FaMoon, FaSun, FaMicrophone, FaSearch, FaCog, FaLock, FaSignOutAlt } from 'react-icons/fa';
import logo from '../assets/knowtix-logo.png';

const Header = ({ 
  darkMode, 
  toggleDarkMode, 
  startListening, 
  isListening, 
  showNotifications, 
  setShowNotifications,
  showUserDetails,
  setShowUserDetails,
  searchQuery,
  setSearchQuery,
  user,
  handleLogout
}) => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="header-logo">
          <img src={logo} alt="Knowtix Logo" className="logo" />
          <span className="header-title">Knowtix</span>
        </div>
        
        <div className="header-search">
          <div className="search-container">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
        </div>
        
        <div className="header-actions">
          <button
            onClick={startListening}
            className={`icon-button ${isListening ? 'recording' : ''}`}
            aria-label="Voice assistant"
          >
            <FaMicrophone />
          </button>
          
          <button
            onClick={toggleDarkMode}
            className="icon-button"
            aria-label="Toggle theme"
          >
            {darkMode ? <FaSun className="text-yellow-400" /> : <FaMoon />}
          </button>
          
          <div className="relative">
            <button
              className="icon-button"
              onClick={(e) => {
                e.stopPropagation();
                setShowNotifications(!showNotifications);
                setShowUserDetails(false);
              }}
              aria-label="Notifications"
            >
              <FaBell />
            </button>
            
            {showNotifications && (
              <div className="notification-dropdown">
                <div className="dropdown-header">
                  <h3>Notifications</h3>
                </div>
                <div className="notification-list">
                  {/* Notification items will go here */}
                  <div className="no-notifications">
                    <p>No notifications</p>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="relative">
            <button
              className="icon-button"
              onClick={(e) => {
                e.stopPropagation();
                setShowUserDetails(!showUserDetails);
                setShowNotifications(false);
              }}
              aria-label="User menu"
            >
              <FaUserCircle className="text-xl" />
            </button>
            
            {showUserDetails && (
              <div className="user-popup">
                <div className="user-info">
                  <div className="user-avatar">
                    {user.profilePic ? (
                      <img src={user.profilePic} alt="Profile" className="profile-pic" />
                    ) : (
                      <FaUserCircle className="text-3xl" />
                    )}
                  </div>
                  <div className="user-details">
                    <p className="user-name">{user.name}</p>
                    <p className="user-role">{user.role}</p>
                  </div>
                </div>
                
                <div className="user-actions">
                  <button className="user-action-btn">
                    <FaCog /> Settings
                  </button>
                  <button className="user-action-btn">
                    <FaLock /> Forgot Password
                  </button>
                  <button onClick={handleLogout} className="user-action-btn logout">
                    <FaSignOutAlt /> Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;