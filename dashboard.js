
const button = document.getElementById('sign-out');

function handleOnClick() {
    button.style.display = 'block'; // Correctly set the display property
    window.location.replace('./login.html'); // Correctly use replace method
}

// Attach the event listener to the button
button.onclick = handleOnClick;
