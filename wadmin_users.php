<?php include("db.php"); ?>
<!DOCTYPE html>
<html>
<head>
<title>Users - Admin</title>
<style>
body { margin:0; font-family:Arial, sans-serif; background:#fff0f5; }
header { background:#d63384; color:white; padding:15px; text-align:center; }
.section { padding:30px; max-width:900px; margin:auto; }
h2 { color:#b30059; }
table { width:100%; border-collapse:collapse; background:white; border-radius:10px; overflow:hidden; box-shadow:0 0 10px rgba(0,0,0,0.1); }
th { background:#d63384; color:white; padding:12px; text-align:left; }
td { padding:10px 12px; border-bottom:1px solid #f0c0d0; font-size:13px; }
tr:hover { background:#fff0f5; }
.back-btn { display:inline-block; margin-bottom:15px; padding:8px 18px; background:#d63384; color:white; text-decoration:none; border-radius:5px; }
</style>
</head>
<body>
<header><h2>Admin - Registered Users</h2></header>
<div class="section">
<a href="wadmin.html" class="back-btn">← Back to Dashboard</a>
<h2>All Registered Users</h2>
<table>
<tr>
    <th>#</th>
    <th>Full Name</th>
    <th>Email</th>
    <th>Phone</th>
</tr>
<?php
$result = mysqli_query($conn, "SELECT id, fullname, email, phone FROM users ORDER BY id DESC");
$i = 1;
if(mysqli_num_rows($result) > 0){
    while($row = mysqli_fetch_assoc($result)){
        echo "<tr>
            <td>{$i}</td>
            <td>" . htmlspecialchars($row['fullname']) . "</td>
            <td>" . htmlspecialchars($row['email']) . "</td>
            <td>" . htmlspecialchars($row['phone']) . "</td>
        </tr>";
        $i++;
    }
} else {
    echo "<tr><td colspan='4' style='text-align:center; padding:20px;'>No users registered yet.</td></tr>";
}
?>
</table>
</div>
</body>
</html>
