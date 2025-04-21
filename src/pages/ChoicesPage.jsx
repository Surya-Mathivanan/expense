import { useNavigate } from 'react-router-dom';

const ChoicesPage = ({ currentUser, setIsLoggedIn, setCurrentUser }) => {
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('currentUser');
    setIsLoggedIn(false);
    setCurrentUser(null);
    navigate('/');
  };

  return (
    <section>
      <h2>Welcome, {currentUser}!</h2>
      <button onClick={() => navigate('/add-item')}>Add Items</button>
      <button onClick={() => navigate('/view-history')}>View History</button>
      <button onClick={handleLogout}>Logout</button>
    </section>
  );
};

export default ChoicesPage;
