import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import ChoicesPage from './pages/ChoicesPage';
import AddItemPage from './pages/AddItemPage';
import ViewHistoryPage from './pages/ViewHistoryPage';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState('');

  return (
    <Router>
      <div className="container">
        <Routes>
          <Route 
            path="/" 
            element={
              isLoggedIn ? 
              <Navigate to="/choices" /> : 
              <LoginPage 
                setIsLoggedIn={setIsLoggedIn} 
                setCurrentUser={setCurrentUser} 
              />
            } 
          />
          <Route path="/choices" element={
            <ChoicesPage 
              currentUser={currentUser} 
              setIsLoggedIn={setIsLoggedIn} 
              setCurrentUser={setCurrentUser} 
            />
          } />
          <Route 
            path="/add-item" 
            element={
              isLoggedIn ? 
              <AddItemPage currentUser={currentUser} /> : 
              <Navigate to="/" />
            } 
          />
          <Route 
            path="/view-history" 
            element={
              isLoggedIn ? 
              <ViewHistoryPage currentUser={currentUser} /> : 
              <Navigate to="/" />
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;