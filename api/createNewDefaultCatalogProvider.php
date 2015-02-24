<?php
$hostname="localhost:8889";
$database="cloudMatrix";
$username="root";
$password="root";

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
@$providerName = $request->providerName;
@$icon = $request->icon;
@$providerDescription = $request->providerDescription;
@$providerURL = $request->providerURL;


$link = mysql_connect($hostname, $username, $password);
if (!$link) {
    die('Connection failed: ' . mysql_error());
}

mysql_select_db ($database) or die ('Cannot connect to the database: ' . mysql_error());

mysql_query("INSERT INTO providers (id, name, icon, providerURL, description) VALUES('', '".$providerName."','".$icon."','".$providerURL."', '".$providerDescription."')") or die ('Query is invalid: ' . mysql_error());

$query = mysql_query("SELECT * FROM providers WHERE id='". mysql_insert_id() ."'");

while ($row = mysql_fetch_array($query)) {
    $obj = new stdClass();
    $obj->providerID = $row['id'];
    $obj->providerName = $row['name'];
    $obj->providerDescription = $row['description'];
    $obj->providerURL = $row['providerURL'];
}
echo json_encode($obj);

?>