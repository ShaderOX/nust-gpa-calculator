document.addEventListener('DOMContentLoaded', async () => {
  const SERVERADDR = 'http://localhost:3000';

  console.log("Everything is loaded");

  const sumbitButton = document.getElementsByName("submitBtn")[ 0 ];
  const emailField = document.getElementsByName("emailField")[ 0 ];
  const passwordField = document.getElementsByName("passwordField")[ 0 ];

  sumbitButton.addEventListener('click', async (e) => {
    e.preventDefault();

    const email = emailField.value;
    const password = passwordField.value;

    if (email && password) {
      response = await fetch(`${SERVERADDR}/api/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const { token, error } = await response.json();
      if (!error) {
        localStorage.setItem('token', token);
        document.getElementById('forwardLink').click();
      }
      else {
        passwordField.value = "";
        alert("An error occurred : " + error);
      }
    }
    else {
      alert('Email and Passwords field need to be filled');
    }
  });
});