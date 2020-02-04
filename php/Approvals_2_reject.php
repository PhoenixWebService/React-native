<?php

include 'config.php';

$con = mysqli_connect($HostName,$HostUser,$HostPass,$DatabaseName);

$json = file_get_contents('php://input');

$obj = json_decode($json,true);

$Old_id = $obj['Old_Id'];
		
$Sql_Query_1 = "DELETE FROM update_material_list WHERE id='$Old_id'";

	if(mysqli_query($con,$Sql_Query_1)){
		$MSG = 'Order Rejected';
	
		$json=json_encode($MSG);
	
		echo $json;
	}

?>

