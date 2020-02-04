<?php

include 'config.php';

$con = mysqli_connect($HostName,$HostUser,$HostPass,$DatabaseName);

$json = file_get_contents('php://input');

$obj = json_decode($json,true);

$Sales_Company = $obj['Sales_Company'];

$Purchase_Company = $obj['Purchase_Company'];

$Purchase_Company_Gst = $obj['Purchase_Company_Gst'];

$Purchase_Material_List_New = $obj['Purchase_Material_List_New'];

$Old_id = $obj['Old_id'];


	$Sql_Query = "INSERT INTO confirmed_material_list(sales_company,purchase_company,purchase_company_gst,purchase_material_list)
		VALUES ('$Sales_Company','$Purchase_Company','$Purchase_Company_Gst','$Purchase_Material_List_New')";
		
	$Sql_Query_1 = "DELETE FROM purchaseorder WHERE id='$Old_id'";

	if(mysqli_query($con,$Sql_Query)&& mysqli_query($con,$Sql_Query_1)){
		$MSG = 'Order Accepted';
	
		$json=json_encode($MSG);
	
		echo $json;
	}

?>

