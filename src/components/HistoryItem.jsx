const HistoryItem = ({ date, entries }) => {
    const totalAmount = entries.reduce((total, entry) => total + parseFloat(entry.amount), 0);
  
    return (
      <div>
        <h3>Date: {date}</h3>
        {entries.map((entry, index) => (
          <div key={index} className="history-item">
            Product Name is: {entry.product} -- Amount {entry.amount} Rupee
          </div>
        ))}
        <div className="history-total">
          Total for {date} -- ₹{totalAmount.toFixed(2)}
        </div>
      </div>
    );
  };
  
  export default HistoryItem;