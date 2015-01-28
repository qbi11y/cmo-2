<?php
$hostname="localhost:8889";
$database="cloudMatrix";
$username="root";
$password="root";

$link = mysql_connect($hostname, $username, $password);
if (!$link) {
    die('Connection failed: ' . mysql_error());
}

$id = $_GET['id'];

mysql_select_db ($database) or die ('Cannot connect to the database: ' . mysql_error());

$user_query =mysql_query("SELECT * FROM users WHERE id = ".$id ) or die ('Query is invalid: ' . mysql_error());

while ($row = mysql_fetch_array($user_query)) {
    $obj = new stdClass();
    $obj->id = $row['id'];
    $obj->roleID= $row['roleID'];
    $obj->firstName = $row['firstName'];
    $obj->lastName = $row['lastName'];
    $obj->email = $row['email'];
}
echo json_encode($obj);
?>

