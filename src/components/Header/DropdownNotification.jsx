import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AxiosInstance from '../../service/AxiosInstance';


const DropdownNotification = () => {
  const [notifications, setNotifications] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  // Fetch notifications when the component is mounted
  useEffect(() => {
    AxiosInstance.get('/api/notifications') // Use AxiosInstance for API calls
      .then((response) => {
        setNotifications(response.data);
      })
      .catch((error) => {
        console.error('Error fetching notifications:', error);
      });
  }, []);

  const handleNotificationClick = (notificationId) => {
    // Mark notification as read when clicked
    AxiosInstance.post(`/api/notifications/${notificationId}/read`)
      .then(() => {
        setNotifications((prevNotifications) =>
          prevNotifications.filter((notif) => notif.id !== notificationId)
        );
        // Redirect the user to the notification detail page or another route
        navigate('/notification-detail'); // Change to the appropriate route
      })
      .catch((error) => {
        console.error('Error marking notification as read:', error);
      });
  };

  return (
    <div className="relative">
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="notification-btn"
      >
    
        <svg
          className="notification-icon"
          width="18"
          height="18"
          viewBox="0 0 18 18"
        >
          
        </svg>
      </button>

      {dropdownOpen && (
        <div className="notification-dropdown">
          <div className="dropdown-header">
            <h5>Notifications</h5>
          </div>
          <ul>
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <li
                  key={notification.id}
                  className="notification-item"
                  onClick={() => handleNotificationClick(notification.id)}
                >
                  <p>{notification.message}</p>
                  <small>{new Date(notification.created_at).toLocaleString()}</small>
                </li>
              ))
            ) : (
              <li>No new notifications</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropdownNotification;

/*

<div className="relative">
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="notification-btn"
      >
    
        <svg
          className="notification-icon"
          width="18"
          height="18"
          viewBox="0 0 18 18"
        >
          
        </svg>
      </button>

      {dropdownOpen && (
        <div className="notification-dropdown">
          <div className="dropdown-header">
            <h5>Notifications</h5>
          </div>
          <ul>
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <li
                  key={notification.id}
                  className="notification-item"
                  onClick={() => handleNotificationClick(notification.id)}
                >
                  <p>{notification.message}</p>
                  <small>{new Date(notification.created_at).toLocaleString()}</small>
                </li>
              ))
            ) : (
              <li>No new notifications</li>
            )}
          </ul>
        </div>
      )}
    </div>
*/
