<?php
$connection=mysql_connect('localhost', 'root', 'root') or die(mysql_error());
$dbsel=mysql_select_db('myblog', $connection) or die(mysql_error());
$sfield=$_GET['search'];

$sql="SELECT * FROM `contactlist` WHERE email LIKE '%".$sfield."%' OR name LIKE '%".$sfield."%' LIMIT 0,10";

$query = mysql_query($sql,$connection) or die("<p>$sql</p><p>Fail</p>");/*MySQL_query failed*/

$aReturn = array();

while($myrow = mysql_fetch_array($query))
{
	$email=$myrow['email'];
	$name=$myrow['name'];
	$friends=$myrow['friends'];
	
	$data = array("email"=>$email, "name"=>$name, "friends"=>$friends);
	
	array_push($aReturn, $data);
}

header("Content-type: application/json");

echo json_encode(array("data"=>$aReturn));


?>