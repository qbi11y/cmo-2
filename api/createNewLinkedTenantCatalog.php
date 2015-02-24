<?php
$hostname="localhost:8889";
$database="cloudMatrix";
$username="root";
$password="root";

$defaultCatalog = array();
$catalog = array();
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
@$linkedTenantID = $request->id;
@$brokerID = $request->brokerID;
@$masterTenantID = $request->masterTenantID;

$link = mysql_connect($hostname, $username, $password);

if (!$link) {
    die('Connection failed: ' . mysql_error());
}

mysql_select_db ($database) or die ('Cannot connect to the database: ' . mysql_error());

$defaultCatalog_query = mysql_query("SELECT t1.id AS providerID, t1.name AS providerName, t1.icon AS providerIcon, t1.providerURL, t2.id AS serviceID, t2.name AS serviceName, t2.price AS serviceStartingPrice, t2.shortDescription AS serviceShortDescription, t2.keywords AS serviceKeywords, t2.points AS servicePoints FROM providers AS t1 JOIN defaultServices AS t2 ON t1.id = t2.providerID ORDER BY t2.id DESC");

while($row = mysql_fetch_array($defaultCatalog_query)) {
    $service = new stdClass();
    $service->serviceProviderID = $row['providerID'];
    $service->providerName = $row['providerName'];
    $service->providerIcon = $row['providerIcon'];
    $service->providerURL = $row['providerURL'];
    $service->defaultServiceID = $row['serviceID'];
    $service->serviceName = $row['serviceName'];
    $service->servicePoints = $row['servicePoints'];
    $service->serviceStartingPrice = $row['serviceStartingPrice'];
    $service->serviceShortDescription = $row['serviceShortDescription'];
    $service->serviceKeywords = $row['serviceKeywords'];
    array_push($defaultCatalog, $service);
}

//if you want to add anything to the linked tenant catalog add the fields to the database and update here
for ($n=0; $n < sizeof($defaultCatalog); $n++) {
    //mysql_query("INSERT INTO linkedTenantCatalogs (id, linkedTenantID, providerID, defaultServiceID, customServiceID, serviceName, points, startingPrice, shortDescription, icon, providerIcon, keywords) VALUES ('', 6, 1, 8, 0, 'somename', 50, 50, 'some desci', 'icon', 'provider idcon', 'keyworkds')");

    mysql_query("INSERT INTO linkedTenantCatalogs (id, linkedTenantID, providerID, defaultServiceID, customServiceID, serviceName, points, startingPrice, shortDescription, icon, providerIcon, keywords, providerName) VALUES ('', ".$linkedTenantID.", ".$defaultCatalog[$n]->serviceProviderID.", ".$defaultCatalog[$n]->defaultServiceID.", 0, '".$defaultCatalog[$n]->serviceName."', ".$defaultCatalog[$n]->servicePoints.", ".$defaultCatalog[$n]->serviceStartingPrice.", '".$defaultCatalog[$n]->serviceShortDescription."', '', '".$defaultCatalog[$n]->providerIcon."', '".$defaultCatalog[$n]->serviceKeywords."', '".$defaultCatalog[$n]->providerName."')");

    $linkedTenantCatalog = mysql_query("SELECT * FROM linkedTenantCatalogs WHERE id='". mysql_insert_id() ."'");
    
    while($lt = mysql_fetch_array($linkedTenantCatalog)) {

        $obj = new stdClass();
        $obj->serviceID = $lt['id'];
        $obj->linkedTenantID = $lt['linkedTenantID'];
        $obj->providerID = $lt['providerID'];
        $obj->defaultServiceID = $lt['defaultServiceID'];
        $obj->customServiceID = $lt['customServiceID'];
        $obj->serviceName = $lt['serviceName'];
        $obj->servicePoints = $lt['points'];
        $obj->serviceStartPrice = $lt['startingPrice'];
        $obj->serviceShortDescription = $lt['shortDescription'];
        $obj->serviceIcon = $lt['icon'];
        $obj->providerIcon = $lt['providerIcon'];
        $obj->serviceKeywords = $lt['keywords'];
        $obj->serviceProviderName = $lt['providerName'];
        array_push($catalog, $obj);
    }
}

echo json_encode($catalog);

?>