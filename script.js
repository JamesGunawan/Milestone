// Part for light mode and dark mode


// Get references to the <p> element
const toggleColorElement = document.getElementById('switchmode');

// Initialize variables to track the background color state and theme
let isBlack = false;

// Function to toggle the background color and classes for all elements
function toggleBackgroundColor() {
    const loggedInUser = sessionStorage.getItem('currentUsername');
    if (loggedInUser) {
        // Save preferences only if user is logged in
        if (isBlack) {
            document.documentElement.style.backgroundColor = 'white'; // Change background color to white
            document.documentElement.style.color = 'black'; // Change text color to black
            toggleColorElement.textContent = 'Switch to Dark Mode';

            // Apply light mode classes to all elements
            document.querySelectorAll('*').forEach(element => {
                element.classList.remove('dark-mode');
                element.classList.add('light-mode');
            });

            // Save light mode preference
            localStorage.setItem('isBlack', 'false');
        } else {
            document.documentElement.style.backgroundColor = 'black'; // Change background color to black
            document.documentElement.style.color = 'white'; // Change text color to white
            toggleColorElement.textContent = 'Switch to Light Mode';

            // Apply dark mode classes to all elements
            document.querySelectorAll('*').forEach(element => {
                element.classList.remove('light-mode');
                element.classList.add('dark-mode');
            });

            // Save dark mode preference
            localStorage.setItem('isBlack', 'true');
        }
    } else {
        // Default behavior when not logged in (no saving)
        if (isBlack) {
            document.documentElement.style.backgroundColor = 'white';
            document.documentElement.style.color = 'black'; // Change text color to black
            toggleColorElement.textContent = 'Switch to Dark Mode';
            document.querySelectorAll('*').forEach(element => {
                element.classList.remove('dark-mode');
                element.classList.add('light-mode');
            });
        } else {
            document.documentElement.style.backgroundColor = 'black';
            document.documentElement.style.color = 'white'; // Change text color to white
            toggleColorElement.textContent = 'Switch to Light Mode';
            document.querySelectorAll('*').forEach(element => {
                element.classList.remove('light-mode');
                element.classList.add('dark-mode');
            });
        }
    }
    isBlack = !isBlack; // Toggle the state
}

// Check localStorage for saved mode on page load, but only if user is logged in
window.addEventListener('load', () => {
    const loggedInUser = sessionStorage.getItem('currentUsername');
    if (loggedInUser) {
        const savedMode = localStorage.getItem('isBlack');

        if (savedMode === 'true') {
            isBlack = true; // Keep it in sync for toggling later
            document.documentElement.style.backgroundColor = 'black';
            document.documentElement.style.color = 'white'; // Change text color to white
            toggleColorElement.textContent = 'Switch to Light Mode';
            document.querySelectorAll('*').forEach(element => {
                element.classList.remove('light-mode');
                element.classList.add('dark-mode');
            });
        } else {
            isBlack = false;
            document.documentElement.style.backgroundColor = 'white';
            document.documentElement.style.color = 'black'; // Change text color to black
            toggleColorElement.textContent = 'Switch to Dark Mode';
            document.querySelectorAll('*').forEach(element => {
                element.classList.remove('dark-mode');
                element.classList.add('light-mode');
            });
        }
    } else {
        // Use default settings if no user is logged in
        isBlack = false;
        document.documentElement.style.backgroundColor = 'white';
        document.documentElement.style.color = 'black'; // Change text color to black
        toggleColorElement.textContent = 'Switch to Dark Mode';
        document.querySelectorAll('*').forEach(element => {
            element.classList.remove('dark-mode');
            element.classList.add('light-mode');
        });
    }
});

// Add click event listener to the <p> element
toggleColorElement.addEventListener('click', toggleBackgroundColor);





// Part for video autoplay settings


// Get reference to the autoplay element and main video
const autoplayElement = document.getElementById('autoplay');
const mainVideo = document.getElementById('video');

// Initialize variables to track autoplay and mute states
let isAutoplay = false;
let isMuted = true; // Initially set to mute

// Function to toggle both autoplay and mute
// Function to directly set autoplay and mute based on saved settings
function setAutoplayAndMute() {
    const autoplayParam = isAutoplay ? '1' : '0';
    const muteParam = isMuted ? '1' : '0';
    // Get the current video ID from the main video iframe
    const videoId = mainVideo.getAttribute('data-video-id');
    // Update iframe src to reflect changes in autoplay and mute settings
    const newSrc = `https://www.youtube.com/embed/${videoId}?autoplay=${autoplayParam}&mute=${muteParam}`;
    mainVideo.src = newSrc;
    // Update the text content of the autoplay element to reflect the new state
    autoplayElement.textContent = `Video Autoplay: ${isAutoplay ? 'On' : 'Off'}`;
}
// Load saved autoplay and mute settings from localStorage on page load
window.addEventListener('load', () => {
    const savedAutoplay = localStorage.getItem('isAutoplay');
    const savedMute = localStorage.getItem('isMuted');
    // Set isAutoplay and isMuted based on local storage
    isAutoplay = savedAutoplay === 'true';
    isMuted = savedMute === 'true';
    // Directly apply the saved settings without toggling
    setAutoplayAndMute();
});
// Function to toggle both autoplay and mute and save the settings
function toggleAutoplayAndMute() {
    // Toggle autoplay state
    isAutoplay = !isAutoplay;
    const autoplayParam = isAutoplay ? '1' : '0';
    // Save autoplay preference
    localStorage.setItem('isAutoplay', isAutoplay);
    // Toggle mute state
    isMuted = !isMuted;
    const muteParam = isMuted ? '1' : '0';
    // Save mute preference
    localStorage.setItem('isMuted', isMuted);
    // Update iframe src to reflect changes in autoplay and mute settings
    const videoId = mainVideo.getAttribute('data-video-id');
    const newSrc = `https://www.youtube.com/embed/${videoId}?autoplay=${autoplayParam}&mute=${muteParam}`;
    mainVideo.src = newSrc;
    // Update the text content of the autoplay element to reflect the new state
    autoplayElement.textContent = `Video Autoplay: ${isAutoplay ? 'On' : 'Off'}`;
}
// Add a click event listener to the autoplay element
autoplayElement.addEventListener('click', toggleAutoplayAndMute); 


// Part for themes


// Get references to the dropdown button and content
const dropdownButton = document.getElementById('dropdownButton');
const dropdownContent = document.getElementById('dropdownContent');
const htmlElement = document.documentElement; // Reference to the HTML element

// Get references to elements to target
const moreTitles = document.querySelectorAll('.moretitle'); // All elements with class="moretitle"
const h4Elements = document.querySelectorAll('.moretitle h4'); // All <h4> inside .moretitle

// Function to toggle the dropdown visibility
function toggleDropdown() {
    if (dropdownContent.style.display === 'none' || dropdownContent.style.display === '') {
        dropdownContent.style.display = 'block'; // Show dropdown
    } else {
        dropdownContent.style.display = 'none'; // Hide dropdown
    }
}

function changeTheme(theme) {
    currentTheme = theme; // Update the current theme
    localStorage.setItem('currentTheme', theme);

    switch (theme) {
        case 'default':
            htmlElement.style.color = 'black';
            htmlElement.style.borderColor = 'gold';
            dropdownButton.style.backgroundColor = 'grey'; // Button color for default
            dropdownButton.style.color = 'white'; // Button text color for default
            dropdownButton.style.fontFamily = "'roboto', sans-serif"; // Button font for default
            htmlElement.style.fontFamily = "'roboto', sans-serif"; // Default font

            // Set font and color for main title, more titles, and h4 elements
            mainTitle.style.color = 'black';
            mainTitle.style.fontFamily = "'roboto', sans-serif";
            moreTitles.forEach(title => {
                title.style.color = 'black';
                title.style.fontFamily = "'roboto', sans-serif";
            });
            h4Elements.forEach(h4 => {
                h4.style.color = 'black';
                h4.style.fontFamily = "'roboto', sans-serif";
            });
            break;

        case 'ocean':
            htmlElement.style.color = 'lightblue';
            htmlElement.style.borderColor = 'deepskyblue';
            dropdownButton.style.backgroundColor = 'seafoamgreen'; // Button color for ocean
            dropdownButton.style.color = 'white'; // Button text color for ocean
            dropdownButton.style.fontFamily = "'Lobster', cursive"; // Button font for ocean
            htmlElement.style.fontFamily = "'Lobster', cursive"; // Ocean font

            // Set font and color for main title, more titles, and h4 elements
            mainTitle.style.color = 'lightblue';
            mainTitle.style.fontFamily = "'Lobster', cursive";
            moreTitles.forEach(title => {
                title.style.color = 'lightblue';
                title.style.fontFamily = "'Lobster', cursive";
            });
            h4Elements.forEach(h4 => {
                h4.style.color = 'lightblue';
                h4.style.fontFamily = "'Lobster', cursive";
            });
            break;

        case 'forest':
            htmlElement.style.color = 'darkgreen';
            htmlElement.style.borderColor = 'brown';
            dropdownButton.style.backgroundColor = 'mossgreen'; // Button color for forest
            dropdownButton.style.color = 'white'; // Button text color for forest
            dropdownButton.style.fontFamily = "'Raleway', sans-serif"; // Button font for forest
            htmlElement.style.fontFamily = "'Raleway', sans-serif"; // Forest font

            // Set font and color for main title, more titles, and h4 elements
            mainTitle.style.color = 'darkgreen';
            mainTitle.style.fontFamily = "'Raleway', sans-serif";
            moreTitles.forEach(title => {
                title.style.color = 'darkgreen';
                title.style.fontFamily = "'Raleway', sans-serif";
            });
            h4Elements.forEach(h4 => {
                h4.style.color = 'darkgreen';
                h4.style.fontFamily = "'Raleway', sans-serif";
            });
            break;

        case 'halloween':
            htmlElement.style.color = 'orange';
            htmlElement.style.borderColor = 'black';
            dropdownButton.style.backgroundColor = 'black'; // Button color for Halloween
            dropdownButton.style.color = 'orange'; // Button text color for Halloween
            dropdownButton.style.fontFamily = "'Creepster', cursive"; // Button font for Halloween
            htmlElement.style.fontFamily = "'Creepster', cursive"; // Halloween font

            // Set font and color for main title, more titles, and h4 elements
            mainTitle.style.color = 'orange';
            mainTitle.style.fontFamily = "'Creepster', cursive";
            moreTitles.forEach(title => {
                title.style.color = 'orange';
                title.style.fontFamily = "'Creepster', cursive";
            });
            h4Elements.forEach(h4 => {
                h4.style.color = 'orange';
                h4.style.fontFamily = "'Creepster', cursive";
            });
            break;

        case 'winter':
            htmlElement.style.color = 'lightblue';
            htmlElement.style.borderColor = 'white';
            dropdownButton.style.backgroundColor = 'blue'; // Button color for winter
            dropdownButton.style.color = 'white'; // Button text color for winter
            dropdownButton.style.fontFamily = "'Snowburst One', cursive"; // Button font for winter
            htmlElement.style.fontFamily = "'Snowburst One', cursive"; // Winter font

            // Set font and color for main title, more titles, and h4 elements
            mainTitle.style.color = 'lightblue';
            mainTitle.style.fontFamily = "'Snowburst One', cursive";
            moreTitles.forEach(title => {
                title.style.color = 'lightblue';
                title.style.fontFamily = "'Snowburst One', cursive";
            });
            h4Elements.forEach(h4 => {
                h4.style.color = 'lightblue';
                h4.style.fontFamily = "'Snowburst One', cursive";
            });
            break;
    }

    // Ensure text color follows the theme
    if (isBlack) {
        document.documentElement.style.color = 'white'; // Dark mode text color
    } else {
        document.documentElement.style.color = (theme === 'default') ? 'black' : document.documentElement.style.color;
    }

}

// Add click event listeners to each theme option
const themeOptions = document.querySelectorAll('.theme-option');
themeOptions.forEach(option => {
    option.addEventListener('click', function () {
        const selectedTheme = this.getAttribute('data-theme');
        changeTheme(selectedTheme);
        dropdownContent.style.display = 'none'; // Close dropdown after selection
    });
});

// Add a click event listener to the dropdown button
dropdownButton.addEventListener('click', toggleDropdown);

// Close the dropdown if the user clicks outside of it
window.addEventListener('click', function (event) {
    if (!event.target.matches('#dropdownButton')) {
        dropdownContent.style.display = 'none';
    }
});

// Load saved theme and apply it first
const savedTheme = localStorage.getItem('currentTheme');
if (savedTheme) {
    changeTheme(savedTheme);
}

// Then apply dark/light mode based on saved preferences
const savedMode = localStorage.getItem('isBlack');
if (savedMode === 'true') {
    isBlack = true;
    document.documentElement.style.backgroundColor = 'black';
    toggleColorElement.textContent = 'Switch to Light Mode';
    linkElements.forEach(element => {
        element.classList.remove('light-mode');
        element.classList.add('dark-mode');
    });
} else {
    isBlack = false;
    document.documentElement.style.backgroundColor = 'white';
    toggleColorElement.textContent = 'Switch to Dark Mode';
    linkElements.forEach(element => {
        element.classList.remove('dark-mode');
        element.classList.add('light-mode');
    });
}


// Part for displaying categories


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


// Part for displaying description


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


// Part for video recommended videos container


// Select the playlist container
const playlistContainer = document.getElementById('morevidscontainer');

// Add an event listener for mousewheel scrolling
playlistContainer.addEventListener('wheel', function(e) {
    e.preventDefault(); // Prevent the default vertical scrolling
    playlistContainer.scrollLeft += e.deltaY; // Scroll horizontally instead
});

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


