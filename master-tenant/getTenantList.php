<?php
//ENTER YOUR DATABASE CONNECTION INFO BELOW:
$hostname="localhost:8889";
$database="cloudMatrix";
$username="root";
$password="root";
$linkedTenants = array();


//DO NOT EDIT BELOW THIS LINE
$link = mysql_connect($hostname, $username, $password);
if (!$link) {
die('Connection failed: ' . mysql_error());
}

mysql_select_db ($database) or die ('Cannot connect to the database: ' . mysql_error());

$id = $_GET['masterTenantID'];

$mt_query = mysql_query("SELECT * from linkedTenants WHERE masterTenantID=".$id) or die ('Query is invalid: ' . mysql_error());

while ($row = mysql_fetch_array($mt_query)) {
    $lt = new stdClass();
    $lt->id = $row['id'];
    $lt->masterTenantID = $row['masterTenantID'];
    $lt->catalogID = $row['catalogID'];
    $lt->name = $row['name'];
    array_push($linkedTenants, $lt);
}

echo json_encode($linkedTenants);

?>