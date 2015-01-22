<?php
//ENTER YOUR DATABASE CONNECTION INFO BELOW:
$hostname="localhost:8889";
$database="cloudMatrix";
$username="root";
$password="root";
$lt = new stdClass();
$details = new stdClass();
$services = array();

//DO NOT EDIT BELOW THIS LINE
$link = mysql_connect($hostname, $username, $password);
if (!$link) {
die('Connection failed: ' . mysql_error());
}

mysql_select_db ($database) or die ('Cannot connect to the database: ' . mysql_error());

$id = $_GET['linkedTenantID'];

$lt_query = mysql_query("SELECT * from linkedTenants WHERE id=".$id) or die ('Query is invalid: ' . mysql_error());
$service_query = mysql_query("SELECT * from linkedTenantCatalogs WHERE linkedTenantID=".$id) or die ('Query is invalid: ' . mysql_error());
while ($row = mysql_fetch_array($lt_query)) {
    $lt->id = $row['id'];
    $lt->masterTenantID = $row['masterTenantID'];
    $lt->catalogID = $row['catalogID'];
    $lt->linkedTenantName = $row['name'];
}

while ($row = mysql_fetch_array($service_query)) {
    $service = new stdClass();
    $service->id = $row['id'];
    $service->linkedTenantID = $row['linkedTenantID'];
    $service->providerID = $row['providerID'];
    $service->defaultCatalogID = $row['defaultCatalogID'];
    $service->serviceName = $row['serviceName'];
    $service->description = $row['description'];
    $service->icon = $row['icon'];
    array_push($services, $service);
}

$details->info = $lt;
$details->services = $services;

echo json_encode($details);

?>