<?php
//ENTER YOUR DATABASE CONNECTION INFO BELOW:
$hostname="localhost:8889";
$database="cloudMatrix";
$username="root";
$password="root";
$masterTenants = array();

//DO NOT EDIT BELOW THIS LINE
$link = mysql_connect($hostname, $username, $password);
if (!$link) {
die('Connection failed: ' . mysql_error());
}

mysql_select_db ($database) or die ('Cannot connect to the database: ' . mysql_error());

$id = $_GET['brokerID'];

$mt_query = mysql_query("SELECT * from linkedTenants WHERE brokerID=".$id) or die ('Query is invalid: ' . mysql_error());

while ($row = mysql_fetch_array($mt_query)) {
    $mt = new stdClass();
    $mt->masterTenantID = $row['masterTenantID'];
    $mt->brokerID = $row['brokerID'];
    $mt->name = $row['name'];
    $mt->tenants = $row['tenants'];
    $mt->defaultCatalog = $row['defaultCatalog'];
    array_push($masterTenants, $mt);
}

echo json_encode($masterTenants);

?>