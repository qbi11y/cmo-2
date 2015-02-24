<?php
$hostname="localhost:8889";
$database="cloudMatrix";
$username="root";
$password="root";
$services = array();

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
//when adding fields, don't forget to add the variable for the field name.
@$providerID = $request->providerID;
@$serviceName = $request->serviceName;
@$shortDescription = $request->shortDescription;
@$startingPrice = $request->startingPrice;
@$keywords = $request->keywords;


$link = mysql_connect($hostname, $username, $password);
if (!$link) {
    die('Connection failed: ' . mysql_error());
}

mysql_select_db ($database) or die ('Cannot connect to the database: ' . mysql_error());

mysql_query("INSERT INTO defaultServices (id, providerID, name, price, points, shortDescription, icon, keywords) VALUES('', ".$providerID.",'".$serviceName."', ".$startingPrice.", 0, '".$shortDescription."', 'icon here','".$keywords."')") or die ('Query is invalid: ' . mysql_error());

$defaultCatalog_query = mysql_query("SELECT t1.id AS providerID, t1.name AS providerName, t1.icon AS providerIcon, t1.providerURL, t2.id AS serviceID, t2.name AS serviceName, t2.price AS serviceStartingPrice, t2.shortDescription AS serviceShortDescription, t2.keywords AS serviceKeywords FROM providers AS t1 JOIN defaultServices AS t2 ON t1.id = t2.providerID ORDER BY t2.id DESC");

while ($row = mysql_fetch_array($defaultCatalog_query)) {
    $service = new stdClass();
    $service->providerID = $row['providerID'];
    $service->providerName = $row['providerName'];
    $service->providerIcon = $row['providerIcon'];
    $service->providerURL = $row['providerURL'];
    $service->serviceID = $row['serviceID'];
    $service->serviceName = $row['serviceName'];
    $service->serviceStartingPrice = $row['serviceStartingPrice'];
    $service->serviceShortDescription = $row['serviceShortDescription'];
    $service->serviceKeywords = $row['serviceKeywords'];
    array_push($services, $service);
}

/*

$query = mysql_query("SELECT * FROM services WHERE id='". mysql_insert_id() ."'");

while ($row = mysql_fetch_array($query)) {
    $obj = new stdClass();
    $obj->serviceID = $row['id'];
    $obj->providerID = $row['providerID'];
    $obj->serviceName = $row['name'];
    $obj->servicePrice = $row['price'];
    $obj->serviceDescription = $row['shortDescription'];
    $obj->serviceKeywords = $row['keywords'];
}
*/
echo json_encode($services);

?>