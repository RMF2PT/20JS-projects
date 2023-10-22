import { APISECRETKEY } from "./secrets.js";

const resultsNav = document.getElementById("resultsNav");
const favoritesLink = document.getElementById("favorites-link");
const loadMorePicturesLink1 = document.getElementById(
  "load-more-nasa-pictures1"
);
const loadMorePicturesLink2 = document.getElementById(
  "load-more-nasa-pictures2"
);
const favoritesNav = document.getElementById("favoritesNav");
const imagesContainer = document.querySelector(".images-container");
const saveConfirmed = document.querySelector(".save-confirmed");
const loader = document.querySelector(".loader");

// NASA API
const apiKey = APISECRETKEY;
const count = "10";
const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=${count}`;

let resultsArray = [];
let favorites = {};

function showContent(page) {
  window.scrollTo({
    top: 0,
    behavior: "instant",
  });
  if (page === "results") {
    resultsNav.classList.remove("hidden");
    favoritesNav.classList.add("hidden");
  } else {
    favoritesNav.classList.remove("hidden");
    resultsNav.classList.add("hidden");
  }
  loader.classList.add("hidden");
}

function createDomNodes(page) {
  const itemCollection =
    page === "favorites" ? Object.values(favorites) : resultsArray;
  itemCollection.forEach((result) => {
    // Card container
    const card = document.createElement("div");
    card.classList.add("card");
    // Link
    const link = document.createElement("a");
    link.href = result.hdurl;
    link.title = "View full image";
    link.target = "_blank";
    // Image
    const image = document.createElement("img");
    image.src = result.url;
    image.alt = "NASA picture of the day";
    image.loading = "lazy";
    image.classList.add("card-img-top");
    // Card body
    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    // Card title
    const cardTitle = document.createElement("h5");
    cardTitle.classList.add("card-title");
    cardTitle.textContent = result.title;
    //  Save text
    const saveText = document.createElement("p");
    saveText.classList.add("clickable");
    if (page === "results") {
      saveText.textContent = "Add to favorites";
      // saveText.setAttribute("onclick", `saveFavorite('${result.url}')`);
      saveText.setAttribute("url", result.url);
      saveText.addEventListener("click", saveFavorite);
    } else {
      saveText.textContent = "Remove favorite";
      // saveText.setAttribute("onclick", `removeFavorite('${result.url}')`);
      saveText.setAttribute("url", result.url);
      saveText.addEventListener("click", removeFavorite);
    }
    // Card explanation
    const cardText = document.createElement("p");
    cardText.textContent = result.explanation;
    // Footer
    const footer = document.createElement("small");
    footer.classList.add("text-muted");
    // Date
    const date = document.createElement("strong");
    date.textContent = result.date;
    // Copyright
    const copyright = document.createElement("span");
    copyright.textContent = ` ${result.copyright || ""}`;
    // Append
    footer.append(date, copyright);
    cardBody.append(cardTitle, saveText, cardText, footer);
    link.appendChild(image);
    card.append(link, cardBody);
    imagesContainer.appendChild(card);
  });
}

function updateDom(page) {
  // Get favorites from localStorage
  if (localStorage.getItem("nasaFavorites")) {
    favorites = JSON.parse(localStorage.getItem("nasaFavorites"));
  }
  imagesContainer.textContent = "";
  createDomNodes(page);
  showContent(page);
}

// Get images from NASA API
async function getNasaPictures() {
  // Show the loader
  loader.classList.remove("hidden");
  try {
    const response = await fetch(apiUrl);
    resultsArray = await response.json();
    updateDom("results");
  } catch (error) {
    console.log(error);
  }
}

// Add result to favorites
function saveFavorite(e) {
  const itemUrl = e.srcElement.attributes.url.value;
  // Loop through results array to select favorite
  resultsArray.forEach((item) => {
    if (item.url.includes(itemUrl) && !favorites[itemUrl]) {
      favorites[itemUrl] = item;
      // Show save confirmation
      saveConfirmed.classList.remove("hidden");
      setTimeout(() => {
        saveConfirmed.classList.add("hidden");
      }, 2000);
      // Save favorites to LocalStorage
      localStorage.setItem("nasaFavorites", JSON.stringify(favorites));
    }
  });
}

// Remove item from favorites
function removeFavorite(e) {
  const itemUrl = e.srcElement.attributes.url.value;
  if (favorites[itemUrl]) {
    delete favorites[itemUrl];
    // Save favorites to LocalStorage
    localStorage.setItem("nasaFavorites", JSON.stringify(favorites));
    updateDom("favorites");
  }
}

// On load
getNasaPictures();

// Event Listeners
favoritesLink.addEventListener("click", () => {
  updateDom("favorites");
});
loadMorePicturesLink1.addEventListener("click", getNasaPictures);
loadMorePicturesLink2.addEventListener("click", getNasaPictures);
