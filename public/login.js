document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form');
    const authMsg = document.getElementById('result');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch('https://expensetracker-07w3k765.b4a.run/public/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            if (response.ok) {
                // If login is successful, redirect to the dashboard
                alert('Bravo, Login request was successful!')
                window.location.replace('./index2.html'); // Change to your dashboard URL
            } else {
                // If login fails, display an error message
                const errorData = await response.json();
                authMsg.textContent = errorData.message || "Login failed.Check credentials or register below.";
            }
        } catch (err) {
            authMsg.textContent = 'An error occurred. Please try again later.';
        }
    });
});

const a = document.getElementById('dashboard');

function handleDashboard() {
    a.href = './login.html';
}

a.onclick = handleDashboard;
