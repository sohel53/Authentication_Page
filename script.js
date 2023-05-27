
const signupForm = document.getElementById('signup-form');
const signupButton = document.getElementById('signup-btn');


const profileSection = document.getElementById('profile');
const profileDetails = document.getElementById('profile-details');
const logoutButton = document.getElementById('logout-btn');


signupButton.addEventListener('click', () => {
  const fullName = document.getElementById('fullname').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirm-password').value;

  if (password !== confirmPassword) {
    showError('Passwords do not match');
    return;
  }

  const accessToken = generateAccessToken();


  const userState = {
    fullName,
    email,
    password,
    accessToken
  };
  localStorage.setItem('userState', JSON.stringify(userState));

  showSuccess('Signup successful! Redirecting to profile...');
  setTimeout(() => {
    window.location.href = '/profile';
  }, 2000);
});


logoutButton.addEventListener('click', () => {
  localStorage.removeItem('userState');
  window.location.href = '/';
});


window.addEventListener('load', () => {
  const userState = localStorage.getItem('userState');
  if (userState) {

    const { fullName, email } = JSON.parse(userState);
    showProfile(fullName, email);
  } else {

    signupForm.style.display = 'block';
  }
});


function generateAccessToken() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const length = 16;
  let token = '';
  for (let i = 0; i < length; i++) {
    token += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return token;
}


function showProfile(fullName, email) {
  signupForm.style.display = 'none';
  profileSection.style.display = 'block';

  const profileHTML = `
    <p><strong>Full Name:</strong> ${fullName}</p>
    <p><strong>Email:</strong> ${email}</p>
  `;
  profileDetails.innerHTML = profileHTML;
}


function showSuccess(message) {
  const successMsg = document.createElement('p');
  successMsg.classList.add('success');
  successMsg.innerText = message;
  signupForm.appendChild(successMsg);
}


function showError(message) {
  const errorMsg = document.createElement('p');
  errorMsg.classList.add('error');
  errorMsg.innerText = message;
  signupForm.appendChild(errorMsg);
}
