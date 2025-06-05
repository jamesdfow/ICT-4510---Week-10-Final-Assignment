document.getElementById('login-form').addEventListener('submit', function(event) {
  event.preventDefault(); // stop form from refreshing the page

  //get values from by user
  const username = document.getElementById('login').value;
  const password = document.getElementById('password').value;

  //send a POST request to API with login credentials
  fetch('https://ict4510.herokuapp.com/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: username,
      password: password
    })
  })

  //handling the response from the API
.then(response => {
  if (!response.ok) {
    //if login fails, throws an error
    throw new Error('Login failed');
  }

  //if login is successful, parse the JSON body
  return response.json(); 
})

//using the parsed JSON data
.then(data => {

  //obtaining users first name (me)
  const firstName = data.user.first_name;

  //hiding the login form
  document.getElementById('login-form').style.display = 'none';

  //showing personalized message
  const welcomeMessage = document.getElementById('welcome-message');
  welcomeMessage.innerText = `Welcome, ${firstName}!`;
  welcomeMessage.style.display = 'block';
})
});