<?php


// Variable Setup.
$variableNameArray = array(
'googleID',
'googleAccessToken',
'firstname',
'lastname',
'email',
);

foreach ($variableNameArray as $variablename) {
	${$variablename} = stripslashes(trim($_POST[$variablename]));
	//echo "$variablename: " . ${$variablename} . "<br />";
	//logger("$variablename: " . ${$variablename});
}

// Passing information back to script.
$response = array(
	'success' => true,
	'googleID' => $googleID,
	'googleAccessToken' => $googleAccessToken,
	'firstname' => $firstname,
	'lastname' => $lastname,
	'email' => $email,
);
//*/
echo json_encode($response);
//logger(print_r($response,true));
return;

?>