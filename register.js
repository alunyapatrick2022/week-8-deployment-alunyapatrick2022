document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form')
    

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const fullNames = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        // const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const authMsg = document.getElementById('result');


        try{
            const response = await fetch('http://localhost:3000/api/register', {
                method: 'POST',
                headers:  {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ fullNames, email, username, password })
            });

            const data = response.data;

            if(!response.ok) {
                authMsg.textContent = "User already exists!";
            } else {
                alert('Bravo, Registration request successful!');
                window.location.replace('./login.html');
            }

        } catch (err) {
            authMsg.textContent = 'An error occured';
        }
    })

})

const a = document.getElementById('dashboard');

function handleDashboard() {
    a.href = './login.html';
}

a.onclick = handleDashboard;
