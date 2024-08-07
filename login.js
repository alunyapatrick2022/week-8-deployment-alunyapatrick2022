document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form');
    const authMsg = document.getElementById('auth-msg');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch('https://powerlearn-project-week-8-deployment.netlify.app/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            if (response.ok) {
                // If login is successful, redirect to the dashboard
                window.location.href = "./dashboard.html"; // Change to your dashboard URL
            } else {
                // If login fails, display an error message
                const errorData = await response.json();
                authMsg.textContent = errorData.message || "Login failed. Please check your credentials.";
            }
        } catch (err) {
            authMsg.textContent = 'An error occurred. Please try again later.';
        }
    });
});
