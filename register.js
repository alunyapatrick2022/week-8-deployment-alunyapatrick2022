document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form')
    

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password');
        const authMsg = document.getElementById('result');

        // if(confirmPassword === password){
        //     authMsg.textContent =  'Password match';

        // }
        // else {
        //     authMsg.textContent = 'Password do not match';
        // }


        try{
            const response = await fetch('http://localhost:4000/api/register', {
                method: 'POST',
                headers:  {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, email, password })
            });

            const data = response.data;

            if (response.ok && (confirmPassword === password)) {
                alert('Bravo, Registration request successful!');
                window.location.replace('./login.html');
            } else {
                authMsg.textContent = "Please check if details are correctly filled!";

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
