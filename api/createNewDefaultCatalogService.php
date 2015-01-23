<?php
$hostname="localhost:8889";
$database="cloudMatrix";
$username="root";
$password="root";
$masterTenant = array();

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
//when adding fields, don't forget to add the variable for the field name.
@$providerID = $request->provider;
@$serviceName = $request->serviceName;
@$serviceDescription = $request->serviceDescription;
@$startingPrice = $request->startingPrice;


$link = mysql_connect($hostname, $username, $password);
if (!$link) {
    die('Connection failed: ' . mysql_error());
}

mysql_select_db ($database) or die ('Cannot connect to the database: ' . mysql_error());

mysql_query("INSERT INTO services (id, providerID, name, price, description) VALUES('', ".$providerID.",'".$serviceName."', ".$startingPrice.", '".$serviceDescription."')") or die ('Query is invalid: ' . mysql_error());

$query = mysql_query("SELECT * FROM services WHERE id='". mysql_insert_id() ."'");

while ($row = mysql_fetch_array($query)) {
    $obj = new stdClass();
    $obj->id = $row['id'];
    $obj->providerID = $row['providerID'];
    $obj->name = $row['name'];
    $obj->startingPrice = $row['startingPrice'];
    $obj->description = $row['description'];
}
echo json_encode($obj);

?>