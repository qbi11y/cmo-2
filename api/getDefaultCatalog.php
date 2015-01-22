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

//$data = file_get_contents("php://input");
//$objData = json_decode($data);
//@$id = $objData->id;

$provider_query = mysql_query("SELECT * from providers") or die ('Query is invalid: ' . mysql_error());
$services_query = mysql_query("SELECT * from services") or die ('Query is invalid: ' . mysql_error());

while ($row = mysql_fetch_array($provider_query)) {
    $obj = new stdClass();
    $obj->id = $row['id'];
    $obj->name = $row['name'];
    $obj->icon = $row['icon'];
    $obj->description = $row['description'];
    array_push($providers, $obj);
}

while ($row = mysql_fetch_array($services_query)) {
    $obj = new stdClass();
    $obj->id = $row['id'];
    $obj->providerID = $row['providerID'];
    $obj->name = $row['name'];
    $obj->description = $row['description'];
    array_push($services, $obj);
}

$catalog->providers = $providers;
$catalog->services = $services;

echo json_encode($catalog);

?>