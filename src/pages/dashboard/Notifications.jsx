import { useState, useEffect } from 'react';
import { FaBell, FaCheck, FaTrash, FaExclamationCircle, FaInfoCircle, FaCheckCircle } from 'react-icons/fa';
import './Notifications.css';

const NotificationsCenter = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'Document Approved',
      message: 'Your document "Project Scope v2.0" has been approved by John Doe.',
      date: '2023-06-15T10:30:00',
      read: false,
      type: 'success',
    },
    {
      id: 2,
      title: 'New Comment',
      message: 'Sarah Smith commented on your drawing "Floor Plan - Level 3".',
      date: '2023-06-14T15:45:00',
      read: false,
      type: 'info',
    },
    {
      id: 3,
      title: 'Approval Required',
      message: 'You have 3 documents pending your approval.',
      date: '2023-06-14T09:15:00',
      read: false,
      type: 'warning',
    },
    {
      id: 4,
      title: 'Deadline Reminder',
      message: 'The submission deadline for "Structural Calculations" is in 2 days.',
      date: '2023-06-13T16:20:00',
      read: true,
      type: 'urgent',
    },
    {
      id: 5,
      title: 'New Version Uploaded',
      message: 'A new version of "Electrical Layouts" has been uploaded by Michael Brown.',
      date: '2023-06-12T11:10:00',
      read: true,
      type: 'info',
    },
  ]);

  const [activeFilter, setActiveFilter] = useState('all');

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

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };

  const filteredNotifications = notifications.filter(notification => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'unread') return !notification.read;
    return notification.type === activeFilter;
  });

  const getTypeIcon = (type) => {
    switch (type) {
      case 'success':
        return <FaCheckCircle className="icon-success" />;
      case 'warning':
        return <FaExclamationCircle className="icon-warning" />;
      case 'urgent':
        return <FaExclamationCircle className="icon-urgent" />;
      default:
        return <FaInfoCircle className="icon-info" />;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="notifications-container">
      <div className="notifications-header">
        <h2>
          <FaBell /> Notifications
        </h2>
        <div className="notification-actions">
          <button className="mark-all-read" onClick={markAllAsRead}>
            Mark all as read
          </button>
          <div className="filter-buttons">
            <button
              className={`filter-button ${activeFilter === 'all' ? 'active' : ''}`}
              onClick={() => setActiveFilter('all')}
            >
              All
            </button>
            <button
              className={`filter-button ${activeFilter === 'unread' ? 'active' : ''}`}
              onClick={() => setActiveFilter('unread')}
            >
              Unread
            </button>
            <button
              className={`filter-button ${activeFilter === 'urgent' ? 'active' : ''}`}
              onClick={() => setActiveFilter('urgent')}
            >
              Urgent
            </button>
          </div>
        </div>
      </div>

      <div className="notifications-list">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`notification-item ${notification.read ? '' : 'unread'} ${notification.type}`}
            >
              <div className="notification-icon">
                {getTypeIcon(notification.type)}
              </div>
              <div className="notification-content">
                <h3>{notification.title}</h3>
                <p>{notification.message}</p>
                <div className="notification-meta">
                  <span className="notification-date">
                    {formatDate(notification.date)}
                  </span>
                  <div className="notification-actions">
                    {!notification.read && (
                      <button
                        className="action-button"
                        onClick={() => markAsRead(notification.id)}
                        title="Mark as read"
                      >
                        <FaCheck />
                      </button>
                    )}
                    <button
                      className="action-button"
                      onClick={() => deleteNotification(notification.id)}
                      title="Delete"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-notifications">
            <p>No notifications found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsCenter;