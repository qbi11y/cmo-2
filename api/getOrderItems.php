<?php
$hostname="localhost:8889";
$database="cloudMatrix";
$username="root";
$password="root";
$allItems = array();

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
@$orders = $request->orders;

$link = mysql_connect($hostname, $username, $password);
if (!$link) {
    die('Connection failed: ' . mysql_error());
}

$id = $_GET['orderID'];

mysql_select_db ($database) or die ('Cannot connect to the database: ' . mysql_error());


for ($n=0; $n < sizeof($request); $n++) {
    $item_query =mysql_query("SELECT t1.orderID, t1.serviceID, t2.serviceName, t2.providerID, t2.icon FROM orderItems AS t1 JOIN linkedTenantCatalogs AS t2 ON t1.serviceID = t2.id WHERE t1.orderID =  ".$request[$n]->orderID ) or die ('Query is invalid: ' . mysql_error());

    $orderItems = array();
    while ($row = mysql_fetch_array($item_query)) {
        $obj = new stdClass();
        $obj->providerID = $row['providerID'];
        $obj->orderID= $row['orderID'];
        $obj->serviceID = $row['serviceID'];
        $obj->serviceName = $row['serviceName'];
        $obj->icon = $row['icon'];
        array_push($orderItems, $obj);
    }
    array_push($allItems, $orderItems);
}
echo json_encode($allItems);
?>