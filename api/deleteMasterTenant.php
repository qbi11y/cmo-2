<?php
//ENTER YOUR DATABASE CONNECTION INFO BELOW:
$hostname="localhost:8889";
$database="cloudMatrix";
$username="root";
$password="root";
$masterTenants = array();

$id = $_GET['masterTenantID'];

//DO NOT EDIT BELOW THIS LINE
$link = mysql_connect($hostname, $username, $password);
if (!$link) {
die('Connection failed: ' . mysql_error());
}

mysql_select_db ($database) or die ('Cannot connect to the database: ' . mysql_error());

$mt_delete = mysql_query("DELETE FROM masterTenants WHERE id=".$id) or die ('Query is invalid: ' . mysql_error());

$delete_confirm = mysql_query("SELECT * FROM masterTenants WHERE id='".$id);

while ($row = mysql_fetch_array($roles_query)) {
    $mt = new stdClass();
    $mt->id = $row['id'];
    array_push($masterTenants, $mt);
}

echo json_encode($masterTenants);

?>