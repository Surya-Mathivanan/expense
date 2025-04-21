document.addEventListener('DOMContentLoaded', function () {
    const loginSection = document.getElementById('login-section');
    const choicesSection = document.getElementById('choices-section');
    const addCardSection = document.getElementById('add-card-section');
    const viewHistorySection = document.getElementById('view-history-section');
    const welcomeMessage = document.getElementById('welcome-message');
    const loginForm = document.getElementById('login-form');
    const addCardForm = document.getElementById('add-card-form');
    const historyList = document.getElementById('history-list');
    const addCardBtn = document.getElementById('add-card-btn');
    const viewHistoryBtn = document.getElementById('view-history-btn');
    const logoutBtn = document.getElementById('logout-btn');
    const backFromAddCardBtn = document.getElementById('back-from-add-card');
    const backFromViewHistoryBtn = document.getElementById('back-from-view-history');

    let isLoggedIn = false;
    let currentUser = '';

    // Load user data and history from localStorage
    let users = JSON.parse(localStorage.getItem('users')) || {};
    let historyData = JSON.parse(localStorage.getItem('historyData')) || {};

    document.getElementById('toggle-password').addEventListener('click', function() {
        let passwordField = document.getElementById('password');
        if (passwordField.type === 'password') {
            passwordField.type = 'text';
            this.classList.remove('fa-eye');
            this.classList.add('fa-eye-slash'); // Change to eye-slash
        } else {
            passwordField.type = 'password';
            this.classList.remove('fa-eye-slash');
            this.classList.add('fa-eye'); // Change to eye-open
        }
    });
    // Login Functionality
    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (username && password) {
            if (users[username] && users[username].password === password) {
                // User exists and password matches
                isLoggedIn = true;
                currentUser = username;
                loginSection.classList.add('hidden');
                choicesSection.classList.remove('hidden');
                welcomeMessage.textContent = `Welcome, ${currentUser}!`;
            } else if (!users[username]) {
                // New user, save their details
                users[username] = { password };
                localStorage.setItem('users', JSON.stringify(users));
                isLoggedIn = true;
                currentUser = username;
                loginSection.classList.add('hidden');
                choicesSection.classList.remove('hidden');
                welcomeMessage.textContent = `Welcome, ${currentUser}!`;
            } else {
                alert('Invalid password.');
            }
        } else {
            alert('Please enter username and password.');
        }
    });

    // Add Card Button
    addCardBtn.addEventListener('click', function () {
        choicesSection.classList.add('hidden');
        addCardSection.classList.remove('hidden');
    });

    // View History Button
    viewHistoryBtn.addEventListener('click', function () {
        choicesSection.classList.add('hidden');
        viewHistorySection.classList.remove('hidden');
        loadHistory();
    });

    // Logout Button
    logoutBtn.addEventListener('click', function () {
        isLoggedIn = false;
        currentUser = '';
        choicesSection.classList.add('hidden');
        loginSection.classList.remove('hidden');
        addCardSection.classList.add('hidden');
        viewHistorySection.classList.add('hidden');
    });

    // Back Button from Add Card Section
    backFromAddCardBtn.addEventListener('click', function () {
        addCardSection.classList.add('hidden');
        choicesSection.classList.remove('hidden');
    });

    // Back Button from View History Section
    backFromViewHistoryBtn.addEventListener('click', function () {
        viewHistorySection.classList.add('hidden');
        choicesSection.classList.remove('hidden');
    });

    // Add Card Form Submission
    function showNotification(message, isError = false) {
        const notification = document.getElementById('notification');
        notification.textContent = message;
        notification.style.backgroundColor = isError ? '#dc3545' : '#28a745'; // Red for error, green for success
        notification.classList.add('show');

        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000); // Hide after 3 seconds
    }

    addCardForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const date = document.getElementById('date').value;
        const product = document.getElementById('product').value;
        const amount = document.getElementById('amount').value;

        if (date && product && amount) {
            const newEntry = { date, product, amount };
            if (!historyData[currentUser]) {
                historyData[currentUser] = [];
            }
            historyData[currentUser].push(newEntry);
            localStorage.setItem('historyData', JSON.stringify(historyData));
            addCardForm.reset();
            showNotification('Item added successfully!');
        } else {
            showNotification('Please fill all fields.', true);
        }
    });

    // Load History
    // Load History
function loadHistory() {
    historyList.innerHTML = '';
    if (historyData[currentUser] && historyData[currentUser].length > 0) {
        const groupedByDate = {};

        // Group entries by date
        historyData[currentUser].forEach(entry => {
            if (!groupedByDate[entry.date]) {
                groupedByDate[entry.date] = [];
            }
            groupedByDate[entry.date].push(entry);
        });

        // Display entries and calculate totals for each date
        for (const date in groupedByDate) {
            const dateHeader = document.createElement('h3');
            dateHeader.textContent = `Date: ${date}`;
            historyList.appendChild(dateHeader);

            groupedByDate[date].forEach(entry => {
                const historyItem = document.createElement('div');
                historyItem.className = 'history-item';
                historyItem.textContent = `Product Name is:  ${entry.product} -- Amount  ${entry.amount} Rupee`;
                historyList.appendChild(historyItem);
            });

            // Calculate total for the date using the new function
            const totalAmount = calculateTotalForDate(groupedByDate[date]);
            const totalDiv = document.createElement('div');
            totalDiv.className = 'history-total';
            totalDiv.textContent = `Total for ${date} -- ₹${totalAmount.toFixed(2)}`;
            historyList.appendChild(totalDiv);
        }
    } else {
        historyList.innerHTML = '<p>No history available.</p>';
    }
}
function calculateTotalForDate(entries) {
    return entries.reduce((total, entry) => total + parseFloat(entry.amount), 0);
}
});