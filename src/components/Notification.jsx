import { useEffect } from 'react';

const Notification = ({ message, isError, onHide }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onHide();
    }, 3000);

    return () => clearTimeout(timer);
  }, [message, onHide]);

  return (
    <div 
      className={`notification ${message ? 'show' : ''}`}
      style={{ backgroundColor: isError ? '#dc3545' : '#28a745' }}
    >
      {message}
    </div>
  );
};

export default Notification;