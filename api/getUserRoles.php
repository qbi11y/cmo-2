<?php
//ENTER YOUR DATABASE CONNECTION INFO BELOW:
$hostname="localhost:8889";
$database="cloudMatrix";
$username="root";
$password="root";
$mt = new stdClass();
$roles = array();

//DO NOT EDIT BELOW THIS LINE
$link = mysql_connect($hostname, $username, $password);
if (!$link) {
die('Connection failed: ' . mysql_error());
}

mysql_select_db ($database) or die ('Cannot connect to the database: ' . mysql_error());

$roles_query = mysql_query("SELECT * FROM roles") or die ('Query is invalid: ' . mysql_error());

while ($row = mysql_fetch_array($roles_query)) {
    $role = new stdClass();
    $role->id = $row['id'];
    $role->role = $row['role'];
    array_push($roles, $role);
}

echo json_encode($roles);

?>