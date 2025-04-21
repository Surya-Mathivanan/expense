import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Notification from '../components/Notification';

const AddItemPage = ({ currentUser }) => {
  const [formData, setFormData] = useState({
    date: '',
    product: '',
    amount: ''
  });
  const [notification, setNotification] = useState({ message: '', isError: false });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (formData.date && formData.product && formData.amount) {
      const historyData = JSON.parse(localStorage.getItem('historyData')) || {};
      
      const newEntry = { 
        date: formData.date, 
        product: formData.product, 
        amount: formData.amount 
      };
      
      if (!historyData[currentUser]) {
        historyData[currentUser] = [];
      }
      
      historyData[currentUser].push(newEntry);
      localStorage.setItem('historyData', JSON.stringify(historyData));
      
      setFormData({ date: '', product: '', amount: '' });
      setNotification({ message: 'Item added successfully!', isError: false });
    } else {
      setNotification({ message: 'Please fill all fields.', isError: true });
    }
  };

  return (
    <section>
      <Notification 
        message={notification.message} 
        isError={notification.isError} 
        onHide={() => setNotification({ message: '', isError: false })} 
      />
      
      <h2>Add Items</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="date">Date:</label>
        <input 
          type="date" 
          id="date" 
          name="date" 
          required 
          value={formData.date}
          onChange={handleChange}
        />
        
        <label htmlFor="product">Product Name:</label>
        <input 
          type="text" 
          id="product" 
          name="product" 
          required 
          value={formData.product}
          onChange={handleChange}
        />
        
        <label htmlFor="amount">Amount:</label>
        <input 
          type="number" 
          id="amount" 
          name="amount" 
          required 
          value={formData.amount}
          onChange={handleChange}
        />
        
        <button type="submit">Add</button>
      </form>
      
      <center>
        <button onClick={() => navigate('/choices')} className="back-btn">Back</button>
      </center>
    </section>
  );
};

export default AddItemPage;