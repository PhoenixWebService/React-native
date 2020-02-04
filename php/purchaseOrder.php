<?php

include 'config.php';

$con = mysqli_connect($HostName,$HostUser,$HostPass,$DatabaseName);

$json = file_get_contents('php://input');

$obj = json_decode($json,true);

$toCompany = $obj['toCompany'];

$materialList = $obj['materialList'];

$fromCompany = $obj['fromCompany'];

$GstNo = $obj['GstNo'];

if(isset($toCompany) && isset($materialList))
{
	$Sql_Query = "INSERT INTO purchaseorder(toCompany , materialList, from_company, gst_no, status)
		VALUES ('$toCompany','$materialList','$fromCompany','$GstNo','Pending')";

	if(mysqli_query($con,$Sql_Query)){
		$MSG = 'Order is Submitted';
	
		$json=json_encode($MSG);
	
		echo $json;
	}
}
else{
	echo 'Fill all Details';
}
?>

