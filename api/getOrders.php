<?php
$hostname="localhost:8889";
$database="cloudMatrix";
$username="root";
$password="root";
$orders = array();

$link = mysql_connect($hostname, $username, $password);
if (!$link) {
    die('Connection failed: ' . mysql_error());
}

$id = $_GET['masterTenantID'];

mysql_select_db ($database) or die ('Cannot connect to the database: ' . mysql_error());

$user_query =mysql_query("SELECT t1.id AS tenantID, t2.id AS orderID, t2.userID AS orderUserID, t3.id AS userID, t3.firstName, t3.lastName, t3.email  FROM linkedTenants AS t1 JOIN orders AS t2 ON t1.id = t2.linkedTenantID JOIN users AS t3 ON t2.userID = t3.id  WHERE t1.masterTenantID = ".$id ) or die ('Query is invalid: ' . mysql_error());

while ($row = mysql_fetch_array($user_query)) {
    $obj = new stdClass();
    $obj->tenantID = $row['tenantID'];
    $obj->orderID= $row['orderID'];
    $obj->userID = $row['userID'];
    $obj->orderUserID = $row['orderUserID'];
    $obj->firstName = $row['firstName'];
    $obj->lastName = $row['lastName'];
    $obj->email = $row['email'];
    array_push($orders, $obj);
}
echo json_encode($orders);
?>