<?php 
	
	include 'config.php';
	
	// Creating connection.
	$con = mysqli_connect($HostName,$HostUser,$HostPass,$DatabaseName);
	
	// Getting the received JSON into $json variable.
	$json = file_get_contents('php://input');
	
	// decoding the received JSON and store into $obj variable.
	$obj = json_decode($json,true);
	
	// Populate User email from JSON $obj array and store into $email.
	$user_id = $obj['user_id'];
	
	// Populate Password from JSON $obj array and store into $password.
	$password = $obj['password'];
	
	//Applying User Login query with email and password match.
	$Sql_Query = "SELECT * FROM user WHERE user_id = '$user_id' and password = '$password' ";
	
	$result = $con->query($Sql_Query);
	
	if ($result->num_rows >0) {
		
		
		while($row[] = $result->fetch_assoc()) {
			
			$item = $row;
			
			$json = json_encode($item);
			
			
		}
		
	}	
	
	echo $json;
	$con->close();
?>