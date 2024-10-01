//chatgpt stuff to help with interactions and to slowly learn understand javascript



//part for light mode and darkmode

// Get references to the <p> element and <a> elements
const toggleColorElement = document.getElementById('switchmode');
const linkElements = document.querySelectorAll('a');

// Initialize a variable to track the background color state
let isBlack = true;

// Function to toggle the background color and <a> elements class
function toggleBackgroundColor() {
  if (isBlack) {
    document.documentElement.style.backgroundColor = 'white'; // Change background color to white
    document.documentElement.style.color = 'black'; // Change text color to black for contrast
    toggleColorElement.textContent = 'Switch to Dark Mode';
    
    // Remove dark mode class and add light mode class
    linkElements.forEach(element => {
      element.classList.remove('dark-mode');
      element.classList.add('light-mode');
    });
  } else {
    document.documentElement.style.backgroundColor = 'black'; // Change background color back to black
    document.documentElement.style.color = 'white'; // Change text color back to white
    toggleColorElement.textContent = 'Switch to Light Mode';
    
    // Remove light mode class and add dark mode class
    linkElements.forEach(element => {
      element.classList.remove('light-mode');
      element.classList.add('dark-mode');
    });
  }
  isBlack = !isBlack; // Toggle the state
}

// Add click event listener to the <p> element
toggleColorElement.addEventListener('click', toggleBackgroundColor);



//part for video autoplay settings

// Get reference to the <p> element
const autoplayElement = document.getElementById('autoplay');

// Initialize variables to track autoplay and mute states
let isAutoplay = false;
let isMuted = true; // Initially set to mute

// Function to toggle both autoplay and mute
function toggleAutoplayAndMute() {
    // Toggle autoplay state
    isAutoplay = !isAutoplay;
    const autoplayParam = isAutoplay ? '1' : '0';

    // Toggle mute state
    isMuted = !isMuted;
    const muteParam = isMuted ? '1' : '0';

    // Select all iframes and update their src attribute
    const iframes = document.querySelectorAll('iframe');
    iframes.forEach(iframe => {
        // Get the video ID from the iframe's data attribute
        const videoId = iframe.getAttribute('data-video-id');
        if (videoId) {
            // Update iframe src to reflect changes
            const newSrc = `https://www.youtube.com/embed/${videoId}?autoplay=${autoplayParam}&mute=${muteParam}`;
            iframe.src = newSrc;
        }
    });

    // Update the text content of the <p> element to reflect the autoplay state
    autoplayElement.textContent = `Video Autoplay: ${isAutoplay ? 'On' : 'Off'}`;
}

// Add a click event listener to the autoplay <p> element
autoplayElement.addEventListener('click', toggleAutoplayAndMute);




// Changes the looks of the categories when clicked
const Hdrop = document.getElementById("hdropbutton");

let isDisplayDrop = false;

function DisplayCategories() {
  if (isDisplayDrop) {
  Hdrop.textContent = "Categories >";
  } else {
  Hdrop.textContent = "Categories v"; 
  }
  isDisplayDrop = !isDisplayDrop;
}
Hdrop.addEventListener("click", DisplayCategories);



// Changes the looks of the description when clicked
const Description = document.getElementById("description");

let isDisplayDescription = false;

function DisplayDescription() {
  if (isDisplayDescription) {
  Description.textContent = "Description >";
  } else {
  Description.textContent = "Description v"; 
  }
  isDisplayDescription = !isDisplayDescription;
}
Description.addEventListener("click", DisplayDescription);