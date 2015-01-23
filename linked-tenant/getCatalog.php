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

//$data = file_get_contents("php://input");
//$objData = json_decode($data);
//@$id = $objData->id;

$id = $_GET['linkedTenantID'];

$catalog_query = mysql_query("SELECT * from linkedTenantCatalogs WHERE linkedTenantID=".$id) or die ('Query is invalid: ' . mysql_error());

while ($row = mysql_fetch_array($catalog_query)) {
    $obj = new stdClass();
    $obj->id = $row['id'];
    $obj->linkedTenantID = $row['linkedTenantID'];
    $obj->providerID = $row['providerID'];
    $obj->serviceName = $row['serviceName'];
    $obj->startingPrice = $row['startingPrice'];
    $obj->description = $row['desctiption'];
    $obj->icon = $row['icon'];
    array_push($catalog, $obj);
}

echo json_encode($catalog);

?>