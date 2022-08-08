const loginFormHandler = async (event) => {
    event.preventDefault();

    // Collect values from the login form
    const username = document.querySelector('#username-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if (username && password) {
      // Send a POST request to the API endpoint
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
        });
    
        if (response.ok) {
            // If successful, redirect the browser to the profile page
            document.location.replace('/dashboard');
        } else {
            console.log(response.statusText);
        }
    }
};

const signupFormHandler = async (event) => {
    event.preventDefault();

    const username = document.querySelector('#username-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    if (password.length < 8) {
        alert('Passwords must be at least 8 characters long')
    }

    if (username && password) {
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            console.log(response)
            document.location.replace('/dashboard');
        } else if (response.status === 409) {
            alert('That username is already in use, please use a different username')
        } else {
            console.log(response.statusText);
        }
    }
};

function signupInstead(e) {
    e.preventDefault()
    let loginForm = document.querySelector('#login-block')
    let signupForm = document.querySelector('#signup-block')
    loginForm.classList.add('invis')
    signupForm.classList.remove('invis')
}

document
    .querySelector('.login-form')
    .addEventListener('submit', loginFormHandler);

document
    .querySelector('.signup-form')
    .addEventListener('submit', signupFormHandler);

document
    .querySelector('#signup-instead')
    .addEventListener('click', signupInstead)