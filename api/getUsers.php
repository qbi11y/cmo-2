<?php
$hostname="localhost:8889";
$database="cloudMatrix";
$username="root";
$password="root";
$users = array();
$roles = array();

$link = mysql_connect($hostname, $username, $password);
if (!$link) {
    die('Connection failed: ' . mysql_error());
}

mysql_select_db ($database) or die ('Cannot connect to the database: ' . mysql_error());
if ( $_GET['tenantID']) { //returns a linked tenant
    $id = $_GET['tenantID'];
    $user_query =mysql_query("SELECT * FROM users WHERE tenantID =".$id) or die ('Query is invalid: ' . mysql_error());
} elseif ( $_GET['masterTenantID']) { //returns a master tenant
    $id = $_GET['masterTenantID'];
    $user_query =mysql_query("SELECT * FROM users WHERE masterTenantID =".$id) or die ('Query is invalid: ' . mysql_error());
} else { //returns a broker
    $user_query =mysql_query("SELECT * FROM users WHERE masterTenantID = 0 AND tenantID = 0") or die ('Query is invalid: ' . mysql_error());
}

$role_query =mysql_query("SELECT * FROM roles") or die ('Query is invalid: ' . mysql_error());

while ($row = mysql_fetch_array($role_query)) {
    $role = new stdClass();
    $role->id = $row['id'];
    $role->role= $row['role'];
    array_push($roles, $role);
}

while ($row = mysql_fetch_array($user_query)) {
    $obj = new stdClass();
    $obj->id = $row['id'];
    $obj->roleID= $row['roleID'];
    $obj->firstName = $row['firstName'];
    $obj->lastName = $row['lastName'];
    $obj->email = $row['email'];
    array_push($users, $obj);
}

$ur = new stdClass();
$ur->users = $users;
$ur->roles = $roles;

echo json_encode($ur);
?>

