<?php
//ENTER YOUR DATABASE CONNECTION INFO BELOW:
$hostname="localhost:8889";
$database="cloudMatrix";
$username="root";
$password="root";


//DO NOT EDIT BELOW THIS LINE
$link = mysql_connect($hostname, $username, $password);
if (!$link) {
die('Connection failed: ' . mysql_error());
}

mysql_select_db ($database) or die ('Cannot connect to the database: ' . mysql_error());

$id = $_GET['id'];

$catalog_q = mysql_query("SELECT * from linkedTenantCatalogs WHERE id=".$id) or die ('Query is invalid: ' . mysql_error());

while ($row = mysql_fetch_array($catalog_q)) {
    $obj = new stdClass();
    $obj->serviceID = $row['id'];
    $obj->linkedTenantID = $row['linkedTenantID'];
    $mt->providerID = $row['providerID'];
    $mt->serviceName = $row['serviceName'];
    $mt->servicePoints = $row['points'];
    $mt->serviceShortDescription = $row['shortDescription'];
}

echo json_encode($mt);

?>