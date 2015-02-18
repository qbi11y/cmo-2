<?php
$hostname="localhost:8889";
$database="cloudMatrix";
$username="root";
$password="root";

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
@$brokerName = $request->brokerName;

$link = mysql_connect($hostname, $username, $password);
if (!$link) {
    die('Connection failed: ' . mysql_error());
}

mysql_select_db ($database) or die ('Cannot connect to the database: ' . mysql_error());

mysql_query("INSERT INTO brokers (id, brokerName) VALUES('', '".$brokerName."')") or die ('Query is invalid: ' . mysql_error());

$query = mysql_query("SELECT * FROM brokers WHERE id='". mysql_insert_id() ."'");

while ($row = mysql_fetch_array($query)) {
    $broker = new stdClass();
    $broker->brokerID = $row['id'];
    $broker->brokerName = $row['brokerName'];
}

echo json_encode($broker);

?>