// Part for handling user registration and processing (login, etc)

// Utility Functions

// Function to check if the user has admin permissions
function hasAdminPerms(username) {
    return username.startsWith('!AdminPerms:#');
}

// Function to strip the admin permission prefix from username
function stripAdminPerms(username) {
    if (hasAdminPerms(username)) {
        return username.slice('!AdminPerms:#'.length);
    }
    return username;
}

// Function to retrieve users from localStorage
function getUsers() {
    return JSON.parse(localStorage.getItem('users')) || [];
}

// Function to save users to localStorage
function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
}

// Function to display registered users (used in signup and admin panel)
function displayRegisteredUsers() {
    const usersList = document.getElementById('users-list');
    if (usersList) {
        const users = getUsers();
        usersList.innerHTML = '';
        users.forEach(user => {
            const listItem = document.createElement('li');
            listItem.textContent = `Username: ${stripAdminPerms(user.username)}, Email: ${user.email}`;
            usersList.appendChild(listItem);
        });
    }
}

// Check if a user is logged in on page load
window.onload = function() {
    const loggedInUser = sessionStorage.getItem('currentUsername');
    const usernameDisplay = document.getElementById('username-display');
    const signInButton = document.querySelector('.signin');
    const signUpButton = document.querySelector('.signup');
    const userMenuDetails = document.querySelector('.user-menu-details');

    console.log('Page loaded. Checking logged-in user.');
    console.log('Logged in user:', loggedInUser); // Debugging

    console.log("Loaded isBlack:", isBlack);
    console.log("Loaded isAutoplay:", isAutoplay);
    console.log("Loaded currentTheme:", currentTheme);

    if (!loggedInUser) {
        // Hide the user menu dropdown and show sign-in and sign-up buttons
        userMenuDetails.style.display = 'none';
        signInButton.style.display = 'block';
        signUpButton.style.display = 'block';
    } else {
        // Show the user menu dropdown and hide sign-in and sign-up buttons
        userMenuDetails.style.display = 'block';
        signInButton.style.display = 'none';
        signUpButton.style.display = 'none';
        usernameDisplay.textContent = `Logged in as: ${loggedInUser}`;
        usernameDisplay.style.color = 'black';  
    }

    // Sign out button functionality
    document.getElementById('signOutButton').addEventListener('click', function() {
        sessionStorage.removeItem('currentUsername'); // Remove username from session storage
        window.location.href = "index.html"; // Redirect to index page
    });
};

// Function to render registered users for the admin panel
function renderAdminUsers() {
    const adminUserList = document.getElementById('admin-user-list');
    const users = getUsers(); // Fetch all users from localStorage
    adminUserList.innerHTML = '';

    users.forEach(user => {
        const listItem = document.createElement('li');
        const strippedUsername = stripAdminPerms(user.username);

        listItem.innerHTML = `
            Username: ${strippedUsername}, Email: ${user.email}
            <button class="delete-user" data-username="${user.username}">Delete</button>
        `;
        adminUserList.appendChild(listItem);
    });

    // Attach event listeners to each delete button
    const deleteButtons = document.querySelectorAll('.delete-user');
    deleteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const usernameToDelete = this.getAttribute('data-username');
            confirmDeleteUser(usernameToDelete);
        });
    });
}

// Function to confirm and delete a user
function confirmDeleteUser(username) {
    const confirmation = confirm(`Are you sure you want to delete the user: ${stripAdminPerms(username)}?`);
    if (confirmation) {
        deleteUser(username);
    }
}

// Function to delete a user and update localStorage
function deleteUser(username) {
    let users = getUsers();
    users = users.filter(user => user.username !== username); // Remove user from list
    saveUsers(users); // Update localStorage
    renderAdminUsers(); // Re-render the user list after deletion
}

