document.addEventListener('DOMContentLoaded', () => {
    const element = document.getElementById('logoutBtn');

    element.addEventListener('click', async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('https://expensetracker-07w3k765.b4a.run/public/logout', {
                method: 'GET',
                credentials: 'same-origin' // You can use 'same-origin' or 'include' depending on your needs
            });
        
            if (response.ok) {
                alert('Logging you out.');
                window.location.replace('./login.html');
            }
            else{
                alert('an error occured.Please give it a short');
            }
        } catch (error) {
            console.error('Error during logout:', error);
        }
    });
});
