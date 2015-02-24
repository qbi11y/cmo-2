<?php
//ENTER YOUR DATABASE CONNECTION INFO BELOW:
$hostname="localhost:8889";
$database="cloudMatrix";
$username="root";
$password="root";
$providers = array();
$services = array();
$catalog = new stdClass();

//DO NOT EDIT BELOW THIS LINE
$link = mysql_connect($hostname, $username, $password);
if (!$link) {
die('Connection failed: ' . mysql_error());
}

mysql_select_db ($database) or die ('Cannot connect to the database: ' . mysql_error());


$defaultCatalog_query = mysql_query("SELECT t1.id AS providerID, t1.name AS providerName, t1.icon AS providerIcon, t1.providerURL, t2.id AS serviceID, t2.name AS serviceName, t2.price AS serviceStartingPrice, t2.shortDescription AS serviceShortDescription, t2.keywords AS serviceKeywords FROM providers AS t1 JOIN defaultServices AS t2 ON t1.id = t2.providerID ORDER BY t2.id DESC");

while ($row = mysql_fetch_array($defaultCatalog_query)) {
    $service = new stdClass();
    $service->providerID = $row['providerID'];
    $service->providerName = $row['providerName'];
    $service->providerIcon = $row['providerIcon'];
    $service->providerURL = $row['providerURL'];
    $service->serviceID = $row['serviceID'];
    $service->serviceName = $row['serviceName'];
    $service->serviceStartingPrice = $row['serviceStartingPrice'];
    $service->serviceShortDescription = $row['serviceShortDescription'];
    $service->serviceKeywords = $row['serviceKeywords'];
    array_push($services, $service);
}

echo json_encode($services);

?>