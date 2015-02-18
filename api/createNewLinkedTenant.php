<?php
$hostname="localhost:8889";
$database="cloudMatrix";
$username="root";
$password="root";
$tenant = array();

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
@$accountName = $request->accountName;
@$masterTenantID = $request->masterTenantID;
@$brokerID = $request->brokerID;
//@$catalog = $request->catalog;

$link = mysql_connect($hostname, $username, $password);
if (!$link) {
    die('Connection failed: ' . mysql_error());
}

mysql_select_db ($database) or die ('Cannot connect to the database: ' . mysql_error());

mysql_query("INSERT INTO linkedTenants (id, brokerID, masterTenantID, name) VALUES('', ".$brokerID.", ".$masterTenantID.", '".$accountName."')") or die ('Query is invalid: ' . mysql_error());

$query = mysql_query("SELECT * FROM linkedTenants WHERE id='". mysql_insert_id() ."'");

while ($row = mysql_fetch_array($query)) {
    $obj = new stdClass();
    $obj->id = $row['id'];
    $obj->brokerID = $row['brokerID'];
    $obj->masterTenantID= $row['masterTenantID'];
    $obj->name = $row['name'];
    //array_push($masterTenant, $obj);
}

/*
for ($n=0; $n < sizeof($catalog); $n++) {
mysql_query("INSERT INTO linkedTenantCatalogs (id, linkedTenantID, providerID, defaultCatalogID, serviceName, points, startingPrice, description, icon) VALUES('',".$obj->id.",".$catalog[$n]->providerID.", ".$catalog[$n]->id.", '".$catalog[$n]->name."', 1000, 500, '".$catalog[$n]->description."', '".$catalog[$n]->icon."')") or die ('Query is invalid: ' . mysql_error());
}
*/
echo json_encode($obj);

?>