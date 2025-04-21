import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HistoryItem from '../components/HistoryItem';

const ViewHistoryPage = ({ currentUser }) => {
  const [historyData, setHistoryData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadHistory = () => {
      const storedData = JSON.parse(localStorage.getItem('historyData')) || {};
      if (storedData[currentUser]) {
        // Group entries by date
        const groupedByDate = {};
        storedData[currentUser].forEach(entry => {
          if (!groupedByDate[entry.date]) {
            groupedByDate[entry.date] = [];
          }
          groupedByDate[entry.date].push(entry);
        });
        setHistoryData(groupedByDate);
      }
    };

    loadHistory();
  }, [currentUser]);

  return (
    <section>
      <h2>View History</h2>
      
      <div className="history-container">
        {Object.keys(historyData).length > 0 ? (
          Object.entries(historyData).map(([date, entries]) => (
            <HistoryItem key={date} date={date} entries={entries} />
          ))
        ) : (
          <p>No history available.</p>
        )}
      </div>
      
      <center>
        <button onClick={() => navigate('/choices')} className="back-btn">Back</button>
      </center>
    </section>
  );
};

export default ViewHistoryPage;