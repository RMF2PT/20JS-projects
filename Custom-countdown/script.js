const inputContainer = document.getElementById("input-container");
const countdownForm = document.getElementById("countdown-form");
const dateElement = document.getElementById("date-picker");
const countdownElement = document.getElementById("countdown");
const countdownTitleElement = document.getElementById("countdown-title");
const countdownButton = document.getElementById("countdown-button");
const timeElements = document.querySelectorAll("span");
const completeElement = document.getElementById("complete");
const completeInfoElement = document.getElementById("complete-info");
const completeButton = document.getElementById("complete-button");

// Set the date input minimun
const today = new Date().toISOString().split("T")[0];
dateElement.setAttribute("min", today);
dateElement.setAttribute("value", today);

let countdownTitle = "";
let countdownDate = "";
let countdownValue = new Date();
let countdownActive;
let savedCountdown;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

// Populate countdown and complete UI
function updateDOM() {
  countdownActive = setInterval(() => {
    // Calculate time to event
    const now = new Date().getTime();
    const distance = countdownValue - now;
    const days = Math.floor(distance / day);
    const hours = Math.floor((distance % day) / hour);
    const minutes = Math.floor((distance % hour) / minute);
    const seconds = Math.floor((distance % minute) / second);

    // Hide input
    inputContainer.hidden = true;

    if (distance < 0) {
      // Show complete on countdown end
      countdownElement.hidden = true;
      clearInterval(countdownActive);
      completeInfoElement.textContent = `${countdownTitle} finished on ${countdownDate}!`;
      completeElement.hidden = false;
    } else {
      // Show countdown
      countdownTitleElement.textContent = `${countdownTitle}`;
      timeElements[0].textContent = `${days}`;
      timeElements[1].textContent = `${hours}`;
      timeElements[2].textContent = `${minutes}`;
      timeElements[3].textContent = `${seconds}`;
      completeElement.hidden = true;
      countdownElement.hidden = false;
    }
  }, second);
}

// Get countdown value
function getCountDownValue() {
  countdownValue = new Date(countdownDate).getTime();
}

// Take values from form input
function updateCountdown(e) {
  e.preventDefault();
  countdownTitle = e.srcElement[0].value;
  countdownDate = e.srcElement[1].value;
  savedCountdown = {
    title: countdownTitle,
    date: countdownDate,
  };
  console.log(savedCountdown);
  localStorage.setItem("countdown", JSON.stringify(savedCountdown));
  // Check for valid countdown date
  if (countdownDate === "") {
    alert("Please select a date");
  } else {
    // Get number version of our current date and uodate DOM
    getCountDownValue();
    updateDOM();
  }
}

// Reset all values
function reset() {
  // Stop the countdown
  clearInterval(countdownActive);
  // Hide countdonws and show input
  countdownElement.hidden = true;
  completeElement.hidden = true;
  inputContainer.hidden = false;
  // Reset the values for countdown title
  countdownTitle = "";
  countdownDate = "";
  getCountDownValue();
  localStorage.removeItem("countdown");
}

// On load
function restorePreviousCountdown() {
  // Get countdown from Local Storage if available
  if (localStorage.getItem("countdown")) {
    inputContainer.hidden = true;
    savedCountdown = JSON.parse(localStorage.getItem("countdown"));
    countdownTitle = savedCountdown.title;
    countdownDate = savedCountdown.date;
    getCountDownValue();
    updateDOM();
  }
}

// Event listener
countdownForm.addEventListener("submit", updateCountdown);
countdownButton.addEventListener("click", reset);
completeButton.addEventListener("click", reset);

// On Load
restorePreviousCountdown();
