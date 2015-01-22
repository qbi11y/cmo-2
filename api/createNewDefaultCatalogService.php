<?php
$hostname="localhost:8889";
$database="cloudMatrix";
$username="root";
$password="root";
$masterTenant = array();

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
@$providerID = $request->provider;
@$serviceName = $request->serviceName;
@$serviceDescription = $request->serviceDescription;


$link = mysql_connect($hostname, $username, $password);
if (!$link) {
    die('Connection failed: ' . mysql_error());
}

mysql_select_db ($database) or die ('Cannot connect to the database: ' . mysql_error());

mysql_query("INSERT INTO services (id, providerID, name, description) VALUES('', ".$providerID.",'".$serviceName."', '".$serviceDescription."')") or die ('Query is invalid: ' . mysql_error());

$query = mysql_query("SELECT * FROM services WHERE id='". mysql_insert_id() ."'");

while ($row = mysql_fetch_array($query)) {
    $obj = new stdClass();
    $obj->id = $row['id'];
    $obj->providerID = $row['providerID'];
    $obj->name = $row['name'];
    $obj->description = $row['description'];
}
echo json_encode($obj);

?>