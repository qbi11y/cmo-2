<?php
$hostname="localhost:8889";
$database="cloudMatrix";
$username="root";
$password="root";

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
@$user = $request->user; //object
@$items = $request->items; //array


$link = mysql_connect($hostname, $username, $password);
if (!$link) {
    die('Connection failed: ' . mysql_error());
}

var_dump($postdata);
echo $user->id;
mysql_select_db ($database) or die ('Cannot connect to the database: ' . mysql_error());

mysql_query("INSERT INTO orders (id, userID, linkedTenantID, viewed) VALUES('', ".$user->id.",".$user->tenantID.", 'n')") or die ('ORDER WAS NOT CREATED - Query is invalid: ' . mysql_error());
$orderID = mysql_insert_id();

for ($n=0; $n < sizeof($items); $n++) {
    mysql_query("INSERT INTO orderItems (id, orderID, serviceID) VALUES('', ".$orderID.", ".$items[$n]->id.")") or die ('ORDER ITEMS NOT CREATED - Query is invalid: ' . mysql_error());
}


/*
while ($row = mysql_fetch_array($query)) {
    $obj = new stdClass();
    $obj->id = $row['id'];
    $obj->providerName = $row['name'];
    $obj->providerDescription = $row['description'];
}
echo json_encode($obj);
*/

?>