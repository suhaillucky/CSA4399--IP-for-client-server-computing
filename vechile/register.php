<?php
// Database connection
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "your_database_name";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Retrieve and sanitize input
$user = $_POST['username'];
$email = $_POST['email'];
$pass = $_POST['password'];
$confirmPass = $_POST['confirmPassword'];

// Validation
if ($pass !== $confirmPass) {
    echo "Passwords do not match!";
    exit();
}

if (strlen($user) < 3) {
    echo "Username must be at least 3 characters long!";
    exit();
}

if (strlen($pass) < 6) {
    echo "Password must be at least 6 characters long!";
    exit();
}

// Check if username or email already exists
$sql = "SELECT id FROM users WHERE username = ? OR email = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ss", $user, $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    echo "Username or email already exists!";
    exit();
}

// Hash the password
$hashedPassword = password_hash($pass, PASSWORD_DEFAULT);

// Insert user into the database
$sql = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sss", $user, $email, $hashedPassword);

if ($stmt->execute()) {
    echo "Registration successful!";
} else {
    echo "Error: " . $stmt->error;
}

// Close connection
$stmt->close();
$conn->close();
?>
