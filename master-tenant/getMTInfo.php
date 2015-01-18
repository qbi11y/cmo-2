<?php
//ENTER YOUR DATABASE CONNECTION INFO BELOW:
$hostname="localhost:8889";
$database="cloudMatrix";
$username="root";
$password="root";
$mt = new stdClass();

//DO NOT EDIT BELOW THIS LINE
$link = mysql_connect($hostname, $username, $password);
if (!$link) {
die('Connection failed: ' . mysql_error());
}

mysql_select_db ($database) or die ('Cannot connect to the database: ' . mysql_error());

$id = $_GET['id'];

$mt_query = mysql_query("SELECT * from masterTenants WHERE id=".$id) or die ('Query is invalid: ' . mysql_error());

while ($row = mysql_fetch_array($mt_query)) {
    $mt->id = $row['id'];
    $mt->name = $row['name'];
    $mt->tenants = $row['tenants'];
    $mt->defaultCatalog = $row['defaultCatalog'];
}

echo json_encode($mt);

?>