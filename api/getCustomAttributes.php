<?php
//ENTER YOUR DATABASE CONNECTION INFO BELOW:
$hostname="localhost:8889";
$database="cloudMatrix";
$username="root";
$password="root";
$attributes = array();

//DO NOT EDIT BELOW THIS LINE
$link = mysql_connect($hostname, $username, $password);
if (!$link) {
die('Connection failed: ' . mysql_error());
}

mysql_select_db ($database) or die ('Cannot connect to the database: ' . mysql_error());

$id = $_GET['serviceID'];

$attr_query = mysql_query("SELECT * from serviceForms WHERE serviceID=".$id) or die ('Query is invalid: ' . mysql_error());

while ($row = mysql_fetch_array($attr_query)) {
    $attr = new stdClass();
    $attr->attributeID = $row['id'];
    $attr->serviceID = $row['serviceID'];
    $attr->brokerID = $row['brokerID'];
    $attr->masterTenantID = $row['masterTenantID'];  
    $attr->label = $row['label'];  
    $attr->inputType = $row['inputType'];
    $attr->uom = $row['uom'];
    array_push($attributes, $attr);
}

echo json_encode($attributes);

?>