<?php
$hostname="localhost:8889";
$database="cloudMatrix";
$username="root";
$password="root";

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
@$accountName = $request->accountName;
@$maxTenants = $request->maxTenants;
@$defaultCatalog = $request->defaultCatalog;
@$brokerID = $request->brokerID;


$link = mysql_connect($hostname, $username, $password);
if (!$link) {
    die('Connection failed: ' . mysql_error());
}

mysql_select_db ($database) or die ('Cannot connect to the database: ' . mysql_error());

mysql_query("INSERT INTO masterTenants (id, brokerID, name, tenants, defaultCatalog) VALUES('', ".$brokerID.", '".$accountName."',".$maxTenants.", '".$defaultCatalog."')") or die ('Query is invalid: ' . mysql_error());

$query = mysql_query("SELECT * FROM masterTenants WHERE id='". mysql_insert_id() ."'");

while ($row = mysql_fetch_array($query)) {
    $obj = new stdClass();
    $obj->id = $row['id'];
    $obj->brokerID = $row['brokerID'];
    $obj->name = $row['name'];
    $obj->maxTenants = $row['tenants'];
}
echo json_encode($obj);

?>