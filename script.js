
const button = document.getElementById('register');

function handleOnClick() {
    button.style.display = 'block'; // Correctly set the display property
    window.location.replace('./register.html'); // Correctly use replace method
}

// Attach the event listener to the button
button.onclick = handleOnClick;
