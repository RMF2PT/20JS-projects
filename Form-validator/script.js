const form = document.getElementById("form");
const passwordEl1 = document.getElementById("password1");
const passwordEl2 = document.getElementById("password2");
const messageContainer = document.querySelector(".message-container");
const message = document.getElementById("message");

let isValid = false;
let passwordsMatch = false;

function validateForm() {
  // Using Constrain API
  isValid = form.checkValidity();
  // Style message for error
  if (!isValid) {
    message.textContent = "Please fill out all fields";
    message.style.color = "red";
    messageContainer.style.borderColor = "red";
    return;
  }
  // Check passords match
  if (passwordEl1.value === passwordEl2.value) {
    passwordsMatch = true;
    passwordEl1.style.borderColor = "green";
    passwordEl2.style.borderColor = "green";
  } else {
    passwordsMatch = false;
    messageContainer.textContent = "Make sure passwords match";
    messageContainer.style.color = "red";
    messageContainer.style.borderColor = "red";
    passwordEl1.style.borderColor = "red";
    passwordEl2.style.borderColor = "red";
    return;
  }
  // If form valid and passwords match
  if (isValid && passwordsMatch) {
    messageContainer.textContent = "Successfully registered!";
    messageContainer.style.color = "green";
    messageContainer.style.borderColor = "green";
  }
}

function storeFormData() {
  const user = {
    name: form.name.value,
    phone: form.phone.value,
    email: form.email.value,
    website: form.website.value,
    password: form.password.value,
  };
  // Do something with user data
  console.log(user);
}

function processFormData(e) {
  e.preventDefault();
  validateForm();
  // Submit data if valid
  if (isValid && passwordsMatch) {
    storeFormData();
  }
}

// Event listeners
form.addEventListener("submit", processFormData);
