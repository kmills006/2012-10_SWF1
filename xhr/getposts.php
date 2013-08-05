<?php
$connection=mysql_connect('localhost', 'root', 'root') or die(mysql_error());
$dbsel=mysql_select_db('myblog', $connection) or die(mysql_error());

$cats=$_GET['category'];
$title=$_GET['title'];
$author=$_GET['author'];
$datetime=$_GET['datetime'];
$id=$_GET['id'];
$start=$_GET['start'];
$limit=$_GET['limit'];

if(!$start){$start=0;}
if(!$limit){$limit=20;}
if($category=="all"){
	$category="";
}
//echo $start;

$sql="SELECT * FROM `myblog` WHERE";

if($id!=""){
	$sql.=" id=".$id;
}else{
	$sql.=" id != -1";
	if($cats!=""){
		$sql.=" AND categories LIKE '%".$cats."%'";
	}
	if($title!=""){
		$sql.=" AND title LIKE '%".$title."%'";
	}
	if($author!=""){
		$sql.=" AND author = '".$author."'";
	}
	if($datetime!=""){
		$sql.=" AND datetime LIKE '".$datetime."'";
	}
}

$sql.=" LIMIT $start, $limit";

$query = mysql_query($sql,$connection) or die("<p>$sql</p><p>Fail</p>");/*MySQL_query failed*/

header("Content-type: application/json");

$areturn = array();

while($myrow = mysql_fetch_array($query))
{
	$cats=$myrow['categories'];
	$title=$myrow['title'];
	$author=$myrow['author'];
	$datetime=$myrow['datetime'];
	$id=$myrow['id'];
	$content=$myrow['content'];
	
	$data = array("category"=>$cats, "title"=>$title, "author"=>$author, "datetime"=>$datetime, "content"=>$content);
	
	array_push($areturn, $data);
}

echo json_encode(array("data"=>$areturn));

?>