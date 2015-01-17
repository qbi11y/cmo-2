<?php
$hostname="localhost:8889";
$database="cloudMatrix";
$username="root";
$password="root";
$masterTenant = array();

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
@$accountName = $request->accountName;
@$maxTenants = $request->maxTenants;


$link = mysql_connect($hostname, $username, $password);
if (!$link) {
    die('Connection failed: ' . mysql_error());
}

mysql_select_db ($database) or die ('Cannot connect to the database: ' . mysql_error());

mysql_query("INSERT INTO masterTenants (id, name, tenants) VALUES('', '".$accountName."', ".$maxTenants.")") or die ('Query is invalid: ' . mysql_error());

$query = mysql_query("SELECT * FROM masterTenants WHERE id='". mysql_insert_id() ."'");

while ($row = mysql_fetch_array($query)) {
    $obj = new stdClass();
    $obj->id = $row['id'];
    $obj->name = $row['name'];
    $obj->maxTenants = $row['tenants'];
    array_push($masterTenant, $obj);
}
echo json_encode($masterTenant);

?>