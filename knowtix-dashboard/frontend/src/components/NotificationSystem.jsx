// components/NotificationSystem.js
import React, { useState, useEffect } from 'react';

const NotificationSystem = ({ enabled }) => {
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Study Reminder', message: 'Time for your Math study session', read: false, time: '10 mins ago' },
    { id: 2, title: 'Assignment Due', message: 'Science assignment is due tomorrow', read: false, time: '1 hour ago' },
    { id: 3, title: 'New Material', message: 'New study material available for History', read: true, time: '2 hours ago' },
  ]);
  
  const [showNotifications, setShowNotifications] = useState(false);
  
  const markAsRead = (id) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };
  
  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({
      ...notification,
      read: true
    })));
  };
  
  const unreadCount = notifications.filter(notification => !notification.read).length;
  
  useEffect(() => {
    if (enabled) {
      // Simulate receiving a new notification
      const interval = setInterval(() => {
        if (Math.random() > 0.8) {
          const newNotification = {
            id: notifications.length + 1,
            title: 'New Notification',
            message: 'This is a new notification',
            read: false,
            time: 'Just now'
          };
          
          setNotifications([newNotification, ...notifications]);
        }
      }, 30000); // Check for new notifications every 30 seconds
      
      return () => clearInterval(interval);
    }
  }, [enabled, notifications]);
  
  return (
    <div className="notification-system">
      <div className="notification-icon" onClick={() => setShowNotifications(!showNotifications)}>
        <i className="fas fa-bell"></i>
        {unreadCount > 0 && (
          <span className="notification-badge">{unreadCount}</span>
        )}
      </div>
      
      {showNotifications && (
        <div className="notification-dropdown">
          <div className="notification-header">
            <h3>Notifications</h3>
            {unreadCount > 0 && (
              <button className="mark-all-read" onClick={markAllAsRead}>
                Mark all as read
              </button>
            )}
          </div>
          
          <div className="notification-list">
            {notifications.length === 0 ? (
              <div className="no-notifications">
                <p>No notifications</p>
              </div>
            ) : (
              notifications.map(notification => (
                <div 
                  key={notification.id} 
                  className={`notification-item ${notification.read ? 'read' : 'unread'}`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="notification-content">
                    <h4>{notification.title}</h4>
                    <p>{notification.message}</p>
                  </div>
                  <div className="notification-time">
                    {notification.time}
                  </div>
                  {!notification.read && (
                    <div className="unread-indicator"></div>
                  )}
                </div>
              ))
            )}
          </div>
          
          <div className="notification-footer">
            <button className="view-all-notifications">
              View All Notifications
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationSystem;