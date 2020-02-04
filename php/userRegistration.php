<?php
 
// Importing DBConfig.php file.
include 'Config.php';
 
// Creating connection.
$con = mysqli_connect($HostName,$HostUser,$HostPass,$DatabaseName);
 
// Getting the received JSON into $json variable.
$json = file_get_contents('php://input');
 
// decoding the received JSON and store into $obj variable.
$obj = json_decode($json,true);
 
$cus_name = $obj['cus_name'];

$cmpny_name = $obj['cmpny_name'];

$gst_no = $obj['gst_no'];
 
$mob_no = $obj['mob_no'];

$user_id = $obj['user_id'];
 
$password = $obj['password'];
 
if(isset($cus_name) && isset($cmpny_name) && isset($gst_no) && isset($mob_no) && isset($user_id) && isset($password))
{ 
 // Creating SQL query and insert the record into MySQL database table.
$Sql_Query = "insert into user (cus_name,cmpny_name,gst_no,mob_no,user_id,password) values ('$cus_name','$cmpny_name','$gst_no','$mob_no','$user_id','$password' )";
 
 
 if(mysqli_query($con,$Sql_Query)){
 
 // If the record inserted successfully then show the message.
$MSG = 'User Registered Successfully' ;
 
// Converting the message into JSON format.
$json = json_encode($MSG);
 
// Echo the message.
 echo $json ;
 
 }
 else{
 
 echo 'Try Again';
 
 }
 }
 mysqli_close($con);
?>