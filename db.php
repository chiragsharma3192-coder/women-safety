<?php
$conn = mysqli_connect("localhost", "root", "", "women_safety");

if(!$conn){
    die("Connection failed: " . mysqli_connect_error());
}
?>