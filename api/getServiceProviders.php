<?php
$hostname="localhost:8889";
$database="cloudMatrix";
$username="root";
$password="root";
$providers = array();


$link = mysql_connect($hostname, $username, $password);
if (!$link) {
    die('Connection failed: ' . mysql_error());
}

mysql_select_db ($database) or die ('Cannot connect to the database: ' . mysql_error());

$query = mysql_query("SELECT * FROM providers");

while ($row = mysql_fetch_array($query)) {
    $obj = new stdClass();
    $obj->providerID = $row['id'];
    $obj->providerName = $row['name'];
    $obj->providerIcon = $row['icon'];
    $obj->providerDescription = $row['description'];
    $obj->providerURL = $row['providerURL'];
    array_push($providers, $obj);
}
echo json_encode($providers);

?>