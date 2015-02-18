<?php
$hostname="localhost:8889";
$database="cloudMatrix";
$username="root";
$password="root";
$services_ar = array();

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
@$roleID = $request->roleID;
@$brokerID = $request->brokerID;
@$masterTenantID = $request->masterTenantID;
@$tenantID = $request->tenantID;
@$firstName = $request->firstName;
@$lastName = $request->lastName;
@$email = $request->email;

$link = mysql_connect($hostname, $username, $password);
if (!$link) {
    die('Connection failed: ' . mysql_error());
}

mysql_select_db ($database) or die ('Cannot connect to the database: ' . mysql_error());

mysql_query("INSERT INTO users (id, roleID, brokerID, masterTenantID, tenantID, firstName, lastName, email) VALUES('',".$roleID.",".$brokerID.",".$masterTenantID.", ".$tenantID.", '".$firstName."', '".$lastName."', '".$email."')") or die ('Insert did not happen Query is invalid: ' . mysql_error());

$user_query =mysql_query("SELECT * FROM users WHERE id = ".mysql_insert_id() ) or die ('Query is invalid: ' . mysql_error());

while ($row = mysql_fetch_array($user_query)) {
    $obj = new stdClass();
    $obj->userID = $row['id'];
    $obj->roleID= $row['roleID'];
    $obj->brokerID = $row['brokerID'];
    $obj->masterTenantID=$row['masterTenantID'];
    $obj->tenantID = $row['tenantID'];
    $obj->firstName = $row['firstName'];
    $obj->lastName = $row['lastName'];
    $obj->email = $row['email'];
}
echo json_encode($obj);
?>

