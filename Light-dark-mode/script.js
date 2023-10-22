const toggleSwitch = document.querySelector('input[type="checkbox"]');
const toggleIcon = document.getElementById("toggle-icon");
const textBox = document.getElementById("text-box");
const nav = document.getElementById("nav");
const image1 = document.getElementById("image1");
const image2 = document.getElementById("image2");
const image3 = document.getElementById("image3");

// Dark or light images
function imageMode(color) {
  image1.src = `img/undraw_proud_coder_${color}.svg`;
  image2.src = `img/undraw_feeling_proud_${color}.svg`;
  image3.src = `img/undraw_conceptual_idea_${color}.svg`;
}

function toggleDarkLightMode(color) {
  nav.style.backgroundColor =
    color === "dark" ? "rgb(0 0 0 / 50%)" : "rgb(255 255 255 / 50%)";
  textBox.style.backgroundColor =
    color === "dark" ? "rgb(255 255 255 / 50%)" : "rgb(0 0 0 / 50%)";
  toggleIcon.children[0].textContent =
    color === "dark" ? "Dark Mode" : "Light Mode";
  color === "dark"
    ? toggleIcon.children[1].classList.replace("fa-sun", "fa-moon")
    : toggleIcon.children[1].classList.replace("fa-moon", "fa-sun");
  imageMode(color === "dark" ? "dark" : "light");
  document.documentElement.setAttribute(
    "data-theme",
    color === "dark" ? "dark" : "light"
  );
  localStorage.setItem("theme", color === "dark" ? "dark" : "light");
}

function switchTheme(event) {
  if (event.target.checked) {
    toggleDarkLightMode("dark");
  } else {
    toggleDarkLightMode("light");
  }
}

// Event listener
toggleSwitch.addEventListener("change", switchTheme);

// Check local storage for theme
const currentTheme = localStorage.getItem("theme");
if (currentTheme) {
  document.documentElement.setAttribute("data-theme", currentTheme);

  if (currentTheme === "dark") {
    toggleSwitch.checked = true;
    toggleDarkLightMode(currentTheme);
  }
}
