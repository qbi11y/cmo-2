<?php
$hostname="localhost:8889";
$database="cloudMatrix";
$username="root";
$password="root";
$services_ar = array();

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
@$linkedTenantID = $request->linkedTenantID;
@$services = $request->services;

$link = mysql_connect($hostname, $username, $password);
if (!$link) {
    die('Connection failed: ' . mysql_error());
}

mysql_select_db ($database) or die ('Cannot connect to the database: ' . mysql_error());

mysql_query("DELETE FROM  linkedTenantCatalogs WHERE linkedTenantID =".$linkedTenantID) or die ('Delete did not happen: ' . mysql_error());
//when customServiceID is added updated the query
for ($n=0; $n < sizeof($services); $n++) {
    settype($services[$n]->providerID, "integer");
    settype($services[$n]->linkedTenantID, "integer");
    settype($services[$n]->servicePoints, "integer");
    settype($services[$n]->serviceStartingPrice, "integer");
    settype($services[$n]->defaultServiceID, "integer");
    mysql_query("INSERT INTO linkedTenantCatalogs (id, linkedTenantID, providerID, defaultServiceID, customServiceID, serviceName, points, startingPrice, shortDescription, icon, providerIcon, keywords, providerName) VALUES('',".$linkedTenantID.",".$services[$n]->providerID.", ".$services[$n]->defaultServiceID.", 0, '".$services[$n]->serviceName."', ".$services[$n]->servicePoints.", ".$services[$n]->serviceStartingPrice." ,'".$services[$n]->serviceShortDescription."', '".$services[$n]->serviceIcon."', '".$services[$n]->providerIcon."',  '".$services[$n]->serviceKeywords."', '".$services[$n]->providerName."')") or die ('Insert did not happen Query is invalid: ' . mysql_error());
  //mysql_query("INSERT INTO linkedTenantCatalogs (id, linkedTenantID, providerID, defaultCatalogID, serviceName, description, icon) VALUES('',".$linkedTenantID->id.",".$providerID.", ".$defaultCatalogID.", '".$services[$n]->serviceName."', '".$services[$n]->description."', '".$services[$n]->icon."')") or die ('Insert did not happen Query is invalid: ' . mysql_error());

}

$services_query =mysql_query("SELECT * FROM linkedTenantCatalogs WHERE linkedTenantID = ".$linkedTenantID) or die ('Query is invalid: ' . mysql_error());



while ($row = mysql_fetch_array($services_query)) {
    $obj = new stdClass();
    $obj->id = $row['id'];
    $obj->linkedTenantID= $row['linkedTenantID'];
    $obj->providerID = $row['providerID'];
    $obj->serviceName = $row['serviceName'];
    $obj->points = $row['points'];
    $obj->startingPrice = $row['startingPrice'];
    $obj->description = $row['shortDescription'];
    $obj->icon = $row['icon'];
    $obj->icon = $row['keywords'];
    array_push($services_ar, $obj);
}
echo json_encode($services_ar);
?>

