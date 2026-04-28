<?php
include("db.php");

$name     = mysqli_real_escape_string($conn, trim($_POST['fullname']));
$email    = mysqli_real_escape_string($conn, trim($_POST['email']));
$phone    = mysqli_real_escape_string($conn, trim($_POST['phone']));
$password = password_hash($_POST['password'], PASSWORD_DEFAULT);

// Check if email already exists
$check = mysqli_query($conn, "SELECT id FROM users WHERE email='$email'");
if(mysqli_num_rows($check) > 0){
    echo "<script>alert('Email already registered!'); window.location.href='wregistration.html';</script>";
    exit;
}

$sql = "INSERT INTO users (fullname, email, password, phone) VALUES ('$name', '$email', '$password', '$phone')";

if(mysqli_query($conn, $sql)){
    echo "<script>alert('Registration Successful! Please login.'); window.location.href='wlogin.html';</script>";
} else {
    echo "<script>alert('Error: " . mysqli_error($conn) . "'); window.history.back();</script>";
}
?>