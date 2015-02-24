<?php
$hostname="localhost:8889";
$database="cloudMatrix";
$username="root";
$password="root";

$formFields = array();
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
@$serviceID = $request->serviceID;
@$brokerID = $request->brokerID;
@$masterTenantID = $request->masterTenantID;
@$attributes = $request->attributes;


$link = mysql_connect($hostname, $username, $password);

if (!$link) {
    die('Connection failed: ' . mysql_error());
}

mysql_select_db ($database) or die ('Cannot connect to the database: ' . mysql_error());


for ($n=0; $n < sizeof($attributes); $n++) {

    mysql_query("INSERT INTO serviceForms (id, serviceID, brokerID, masterTenantID, label, inputType, uom) VALUES('', ".$serviceID.",".$brokerID.",".$masterTenantID." ,'".$attributes[$n]->label."', '".$attributes[$n]->inputType."', '".$attributes[$n]->uom."')") or die ('Query is invalid: ' . mysql_error());

    $query = mysql_query("SELECT * FROM serviceForms WHERE id='". mysql_insert_id() ."'");

    while ($row = mysql_fetch_array($query)) {
        $obj = new stdClass();
        $obj->id = $row['id'];
        $obj->serviceID = $row['serviceID'];
        $obj->brokerID = $row['brokerID'];
        $obj->masterTenantID = $row['masterTenantID'];
        $obj->label = $row['label'];
        $obj->inputType = $row['inputType'];
        $obj->uom = $row['uom'];
        array_push($formFields, $obj);
    }
}


echo json_encode($formFields);

?>