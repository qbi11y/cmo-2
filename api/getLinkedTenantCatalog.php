<?php
//ENTER YOUR DATABASE CONNECTION INFO BELOW:
$hostname="localhost:8889";
$database="cloudMatrix";
$username="root";
$password="root";
$catalog = array();

//DO NOT EDIT BELOW THIS LINE
$link = mysql_connect($hostname, $username, $password);
if (!$link) {
die('Connection failed: ' . mysql_error());
}

mysql_select_db ($database) or die ('Cannot connect to the database: ' . mysql_error());

$id = $_GET['id'];


$catalog_q = mysql_query("SELECT * from linkedTenantCatalogs WHERE linkedTenantID=".$id) or die ('Query is invalid: ' . mysql_error());

while ($row = mysql_fetch_array($catalog_q)) {
    $obj = new stdClass();
    $obj->serviceID = $row['id'];
    $obj->linkedTenantID = $row['linkedTenantID'];
    $obj->providerID = $row['providerID'];
    $obj->providerIcon = $row['providerIcon'];
    $obj->serviceName = $row['serviceName'];
    $obj->servicePoints = $row['points'];
    $obj->serviceStartingPrice= $row['startingPrice'];
    $obj->serviceShortDescription = $row['shortDescription'];
    $obj->serviceIcon = $row['icon'];
    $obj->serviceKeywords = $row['keywords'];
    $obj->providerName = $row['providerName'];
    $obj->defaultServiceID = $row['defaultServiceID'];
    array_push($catalog, $obj);

}

echo json_encode($catalog);

?>