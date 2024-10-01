//Part for light mode and darkmode



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



//Part for video autoplay settings

// Get reference to the autoplay element and main video
const autoplayElement = document.getElementById('autoplay');
const mainVideo = document.getElementById('video');

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

    // Get the current video ID from the main video iframe
    const videoId = mainVideo.getAttribute('data-video-id');

    // Update iframe src to reflect changes in autoplay and mute settings
    const newSrc = `https://www.youtube.com/embed/${videoId}?autoplay=${autoplayParam}&mute=${muteParam}`;
    mainVideo.src = newSrc;

    // Update the text content of the autoplay element to reflect the new state
    autoplayElement.textContent = `Video Autoplay: ${isAutoplay ? 'On' : 'Off'}`;
}

// Add a click event listener to the autoplay element
autoplayElement.addEventListener('click', toggleAutoplayAndMute);



//Part for displaying categories

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

// Event listener to display categories when clicked
Hdrop.addEventListener("click", DisplayCategories);



//Part for displaying description

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
// Event listener to display description when clicked
Description.addEventListener("click", DisplayDescription);


//part for video recommended videos container

// Select the playlist container
const playlistContainer = document.getElementById('morevidscontainer');

// Add an event listener for mousewheel scrolling
playlistContainer.addEventListener('wheel', function(e) {
  e.preventDefault(); // Prevent the default vertical scrolling
  playlistContainer.scrollLeft += e.deltaY; // Scroll horizontally instead
});


//
// Get reference to the main video title and description elements
const mainTitle = document.getElementById('maintitle');
const mainDescription = document.getElementById("maindescription");

// Function to handle thumbnail clicks
function handleThumbnailClick(e) {
  e.preventDefault(); // Prevent the default anchor behavior

  // Get the video ID from the clicked thumbnail's data attribute
  const videoId = this.getAttribute('data-video-id');

  // Get the current autoplay and mute settings
  const autoplayParam = isAutoplay ? '1' : '0';
  const muteParam = isMuted ? '1' : '0';

  // Update the main video iframe's src with the new video ID and autoplay/mute parameters
  mainVideo.setAttribute('data-video-id', videoId); // Update the data-video-id attribute
  mainVideo.src = `https://www.youtube.com/embed/${videoId}?autoplay=${autoplayParam}&mute=${muteParam}`;

  // Get the title of the clicked video from the sibling h4 element
  const clickedTitle = this.nextElementSibling.textContent;

  // Update the main video title with the clicked video title
  mainTitle.textContent = clickedTitle;

  // Update the main video description with a custom message
  mainDescription.textContent = `In this video Markiplier played ${clickedTitle}`;
}

// Add click event listeners to all the thumbnails
const thumbnails = document.querySelectorAll('#morevidscontainer a');
thumbnails.forEach(thumbnail => {
  thumbnail.addEventListener('click', handleThumbnailClick);
});
