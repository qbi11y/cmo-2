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

$providers_query = mysql_query("SELECT * from providers") or die ('Query is invalid: ' . mysql_error());

while ($row = mysql_fetch_array($providers_query)) {
    $provider = new stdClass();
    $provider->id = $row['id'];
    $provider->name = $row['name'];
    $provider->icon = $row['icon'];
    $provider->description = $row['description'];
    array_push($providers, $provider);
}

$services_query = mysql_query("SELECT * from services") or die ('Query is invalid: ' . mysql_error());

while ($row = mysql_fetch_array($services_query)) {
    $service = new stdClass();
    $service->id = $row['id'];
    $service->providerID = $row['providerID'];
    $service->name = $row['name'];
    $service->price = $row['price'];
    $service->description = $row['shortDescription'];
    $service->keywords = $row['keywords'];
    array_push($services, $service);
}


$catalog->services = $services;
$catalog->providers = $providers;

echo json_encode($catalog);

?>