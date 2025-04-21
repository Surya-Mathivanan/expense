import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PasswordInput from '../components/PasswordInput';
import Notification from '../components/Notification';


const LoginPage = ({ setIsLoggedIn, setCurrentUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [notification, setNotification] = useState({ message: '', isError: false });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const users = JSON.parse(localStorage.getItem('users')) || {};
    
    if (username && password) {
      if (users[username] && users[username].password === password) {
        // Successful login
        setIsLoggedIn(true);
        setCurrentUser(username);
        navigate('/choices');
      } else if (!users[username]) {
        // New user
        users[username] = { password };
        localStorage.setItem('users', JSON.stringify(users));
        setIsLoggedIn(true);
        setCurrentUser(username);
        navigate('/choices');
      } else {
        setNotification({ message: 'Invalid password.', isError: true });
      }
    } else {
      setNotification({ message: 'Please enter username and password.', isError: true });
    }
  };

  return (
    <section>
      <Notification 
        message={notification.message} 
        isError={notification.isError} 
        onHide={() => setNotification({ message: '', isError: false })} 
      />
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input 
          type="text" 
          id="username" 
          name="username" 
          required 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        
        <label htmlFor="password">Password:</label>
        <PasswordInput 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        
        <button type="submit">Login</button>
      </form>
    </section>
  );
};

export default LoginPage;