<?php
include("db.php");

$name           = mysqli_real_escape_string($conn, trim($_POST['name']));
$phone          = mysqli_real_escape_string($conn, trim($_POST['phone']));
$email          = mysqli_real_escape_string($conn, trim($_POST['email']));
$complaint_type = mysqli_real_escape_string($conn, $_POST['complaint_type']);
$location       = mysqli_real_escape_string($conn, trim($_POST['location']));
$description    = mysqli_real_escape_string($conn, trim($_POST['description']));

$sql = "INSERT INTO complaints (name, phone, email, complaint_type, location, description, submitted_at)
        VALUES ('$name', '$phone', '$email', '$complaint_type', '$location', '$description', NOW())";

if(mysqli_query($conn, $sql)){
    echo "<script>alert('Complaint submitted successfully! We will contact you soon.'); window.location.href='women.html';</script>";
} else {
    echo "<script>alert('Error submitting complaint. Please try again.'); window.history.back();</script>";
}
?>
