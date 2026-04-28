<?php include("db.php"); ?>
<!DOCTYPE html>
<html>
<head>
<title>Complaints - Admin</title>
<style>
body { margin:0; font-family:Arial, sans-serif; background:#fff0f5; }
header { background:#d63384; color:white; padding:15px; text-align:center; }
.section { padding:30px; max-width:1100px; margin:auto; }
h2 { color:#b30059; }
table { width:100%; border-collapse:collapse; background:white; border-radius:10px; overflow:hidden; box-shadow:0 0 10px rgba(0,0,0,0.1); }
th { background:#d63384; color:white; padding:12px; text-align:left; }
td { padding:10px 12px; border-bottom:1px solid #f0c0d0; font-size:13px; }
tr:hover { background:#fff0f5; }
.back-btn { display:inline-block; margin-bottom:15px; padding:8px 18px; background:#d63384; color:white; text-decoration:none; border-radius:5px; }
.badge { padding:4px 10px; border-radius:20px; font-size:12px; font-weight:bold; }
.badge-harassment { background:#ffd6e0; color:#b30059; }
.badge-domestic { background:#ffe0b2; color:#e65100; }
.badge-cyber { background:#e3f2fd; color:#1565c0; }
.badge-other { background:#f3e5f5; color:#6a1b9a; }
</style>
</head>
<body>
<header><h2>Admin - View Complaints</h2></header>
<div class="section">
<a href="wadmin.html" class="back-btn">← Back to Dashboard</a>
<h2>All Complaints</h2>
<table>
<tr>
    <th>#</th>
    <th>Name</th>
    <th>Phone</th>
    <th>Type</th>
    <th>Location</th>
    <th>Description</th>
    <th>Submitted At</th>
</tr>
<?php
$result = mysqli_query($conn, "SELECT * FROM complaints ORDER BY submitted_at DESC");
$i = 1;
if(mysqli_num_rows($result) > 0){
    while($row = mysqli_fetch_assoc($result)){
        echo "<tr>
            <td>{$i}</td>
            <td>" . htmlspecialchars($row['name']) . "</td>
            <td>" . htmlspecialchars($row['phone']) . "</td>
            <td><span class='badge'>" . htmlspecialchars($row['complaint_type']) . "</span></td>
            <td>" . htmlspecialchars($row['location']) . "</td>
            <td>" . htmlspecialchars(substr($row['description'], 0, 80)) . "...</td>
            <td>" . $row['submitted_at'] . "</td>
        </tr>";
        $i++;
    }
} else {
    echo "<tr><td colspan='7' style='text-align:center; padding:20px;'>No complaints found.</td></tr>";
}
?>
</table>
</div>
</body>
</html>
