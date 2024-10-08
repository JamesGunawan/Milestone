document.getElementById('signinForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const usernameOrEmail = document.getElementById('usernameOrEmail').value.trim();
    const password = document.getElementById('password').value;

    const errorMessageDiv = document.getElementById('error-message');
    errorMessageDiv.style.display = 'none'; // Hide error message by default

    const users = getUsers();

    // Find user
    const user = users.find(user => (user.username === usernameOrEmail || user.email === usernameOrEmail) && user.password === password);

    if (!user) {
        errorMessageDiv.textContent = 'Incorrect username/email or password.';
        errorMessageDiv.style.display = 'block';
        return;
    }

    // Save the logged-in user's username in session storage
    sessionStorage.setItem('currentUsername', user.username); // Save username for future reference

    // Check if the user is an admin
    if (user.isAdmin) {
        // Store admin username as well
        sessionStorage.setItem('currentAdminUsername', user.username); // Store admin username
        // Show the admin panel
        document.getElementById('adminPanel').style.display = 'block';
        renderAdminUsers(); // Call function to render users
    } else {
        // Redirect to index page for normal users
        window.location.href = "index.html";
    }
});

// Handle login redirect when admin clicks the "Login" button
document.getElementById('loginRedirectButton').addEventListener('click', function() {
    window.location.href = "index.html"; // Redirect to login (index) page
});

