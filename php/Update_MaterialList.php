<?php

include 'config.php';

$con = mysqli_connect($HostName,$HostUser,$HostPass,$DatabaseName);

$json = file_get_contents('php://input');

$obj = json_decode($json,true);

$Sales_Company = $obj['Sales_Company'];

$Old_id =$obj['Old_id'];

$Purchase_Date = $obj['Purchase_Date'];

$Purchase_Company = $obj['Purchase_Company'];

$Purchase_Company_Gst = $obj['Purchase_Company_Gst'];

$Purchase_Material_List_Old = $obj['Purchase_Material_List_Old'];

$Purchase_Material_List_New = $obj['Purchase_Material_List_New'];

	$Sql_Query = "INSERT INTO update_material_list(sales_company,purchase_date,purchase_company,purchase_company_gst,old_purchase_material_list,new_purchase_material_list)
		VALUES ('$Sales_Company','$Purchase_Date','$Purchase_Company','$Purchase_Company_Gst','$Purchase_Material_List_Old','$Purchase_Material_List_New')";
		
	$Sql_Query_1 = "DELETE FROM purchaseorder WHERE id='$Old_id'";

	if(mysqli_query($con,$Sql_Query)&& mysqli_query($con,$Sql_Query_1)){
		$MSG = 'Requested for Update';
	
		$json=json_encode($MSG);
	
		echo $json;
	}

?>

