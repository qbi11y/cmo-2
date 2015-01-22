<?php

//ENTER YOUR DATABASE CONNECTION INFO BELOW:
$hostname="localhost:8889";
$database="cloudMatrix";
$username="root";
$password="root";
$obj->id = 5;
$masterTenants = array();

//DO NOT EDIT BELOW THIS LINE
$link = mysql_connect($hostname, $username, $password);
if (!$link) {
die('Connection failed: ' . mysql_error());
}

mysql_select_db ($database) or die ('Cannot connect to the database: ' . mysql_error());

//$data = file_get_contents("php://input");
//$objData = json_decode($data);
//@$id = $objData->id;

$query = mysql_query("SELECT * from masterTenants") or die ('Query is invalid: ' . mysql_error());

while ($row = mysql_fetch_array($query)) {
    $obj = new stdClass();
    $obj->id = $row['id'];
    $obj->name = $row['name'];
    array_push($masterTenants, $obj);
}
echo json_encode($masterTenants);
?>