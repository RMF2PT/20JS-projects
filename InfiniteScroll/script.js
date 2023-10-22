const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photoArray = [];

// Unsplash API data
const photoCount = 30;
const apiAccessKey = APIACCESSKEY;
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiAccessKey}&count=${photoCount}`;
let errorCount = 0;

// Check if all images are loaded
function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
  }
}

// Set attributes
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// Create elements for photos and add to DOM
function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photoArray.length;
  photoArray.forEach((photo) => {
    // Create a for link
    const a = document.createElement("a");
    setAttributes(a, {
      href: photo.links.html,
      target: "_blank",
    });
    // Create img for photo
    const img = document.createElement("img");
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    // Event listener to check when each is finished loading
    img.addEventListener("load", imageLoaded);
    // Put img inside of a and a inside of image container
    a.append(img);
    imageContainer.append(a);
  });
}

// Get photos from Unsplash API
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photoArray = await response.json();
    displayPhotos();
    errorCount = 0;
  } catch (error) {
    if (errorCount < 2) {
      errorCount++;
      getPhotos();
    } else {
      console.error(`API error: ${error.message}`);
    }
  }
}

// Check if scrolling is near bottom of page and load more photos
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});

// On load
getPhotos();
