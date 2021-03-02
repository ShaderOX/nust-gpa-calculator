document.addEventListener('DOMContentLoaded', async () => {
  const SERVERADDR = 'http://localhost:3000';

  console.log("Everything is loaded");

  let response = await fetch(`${SERVERADDR}/api/courses/`, {
    method: "GET",
    headers: { 'Content-Type': 'application/json' }
  });

  const { courses } = await response.json();



  const emailField = document.getElementsByName("emailField")[ 0 ];
  const passwordField = document.getElementsByName("passwordField")[ 0 ];
  const rePasswordField = document.getElementsByName("rePasswordField")[ 0 ];
  const coursesSelection = document.getElementById('courses');
  const sumbitButton = document.getElementsByName("submitBtn")[ 0 ];

  courses.forEach(course => coursesSelection.innerHTML += `<option class="form-control" value="${course}">${course}</option>`);

  sumbitButton.addEventListener('click', async (e) => {
    e.preventDefault();
    const email = emailField.value;
    const password = passwordField.value;
    const rePassword = rePasswordField.value;
    const course = coursesSelection.value;

    if (email && password && rePassword) {
      if (password !== rePassword) {
        alert("The passwords don't match.");
        passwordField.value = "";
        rePasswordField.value = "";
      }
      response = await fetch(`${SERVERADDR}/api/users/register`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, course })
      });
      const { error } = await response;
      if (error) {
        alert('An error occured ' + error);
      }

      document.getElementById('forwardLink').click();

    }
    else {
      alert("All fields need to be filled.");
    }

  });


});