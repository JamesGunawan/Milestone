document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    const errorMessageDiv = document.getElementById('error-message');
    errorMessageDiv.style.display = 'none'; // Hide error message by default

    const users = getUsers();

    // Validate username length (at least 4 characters)
    if (username.length < 4) {
        errorMessageDiv.textContent = 'Username must be at least 4 characters long.';
        errorMessageDiv.style.display = 'block';
        return;
    }

    // Check if the username is already taken
    if (users.some(user => stripAdminPerms(user.username) === username)) {
        errorMessageDiv.textContent = 'Username is already taken.';
        errorMessageDiv.style.display = 'block';
        return;
    }

    // Check if the email is already in use
    if (users.some(user => user.email === email)) {
        errorMessageDiv.textContent = 'Email is already in use.';
        errorMessageDiv.style.display = 'block';
        return;
    }

    // Validate password confirmation
    if (password !== confirmPassword) {
        errorMessageDiv.textContent = 'Passwords do not match.';
        errorMessageDiv.style.display = 'block';
        return;
    }

    // Validate password requirements
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/; // At least one uppercase, one digit, one symbol, minimum 8 characters
    if (!passwordRegex.test(password)) {
        errorMessageDiv.textContent = 'Password must contain at least 1 uppercase letter, 1 number, and 1 symbol.';
        errorMessageDiv.style.display = 'block';
        return;
    }

    // Save user data
    users.push({ username: username, email: email, password: password, isAdmin: hasAdminPerms(username) });
    saveUsers(users);

    // Redirect to sign in page
    window.location.href = "signin.html";
});
