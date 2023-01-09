<?php
header('Content-type:application/json');

$signingSecret = '<SIGNING_SECRET>';
$requestPath = getRequestPath();

if ($requestPath[0] !== 'webhook') {
  response(404, 'Route not found', null);
  exit();
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
  // Use the request body string exactly as provided without and transformations for the signature check.
  // If this data is transformed, decoded, encode in anyway it will fail the signature check.
  $body = file_get_contents('php://input');
}

$signature = extractSstSignatureParts($_SERVER['HTTP_X_SST_SIGNATURE']);
$data['REQUEST_BODY'] = json_decode($body);
$data['REQUEST_HEADERS']['SIGNATURE_V0'] = $signature['v0'];
$data['REQUEST_HEADERS']['SIGNATURE_V1'] = $signature['v1'];
$data['REQUEST_HEADERS']['SIGNATURE_TIMESTAMP'] = $signature['t'];

$signedBody = hash_hmac('sha256', $signature['t'].'.'.$body, $signingSecret, true);

if ($signature['v0'] === base64_encode($signedBody)) {
  response(200, 'Webhook event received, Verification successful', $data);
} else {
  response(200, 'Webhook event received, Verification unsuccessful', $data);
}


function response($status,$status_message,$data)
{
	header('HTTP/1.1 '.$status);
	
	$response['status']=$status;
	$response['status_message']=$status_message;
	$response['data']=$data;
	
	$json_response = json_encode($response);
	echo $json_response;
}

function extractSstSignatureParts($xSstSignature) {
  $signatureParts = explode(',', $xSstSignature);
  $timestamp = explode('=', $signatureParts[0], 2)[1];
  $v0Signature = explode('=', $signatureParts[1], 2)[1];
  if (array_key_exists(2, $signatureParts)) {
    $v1Signature = explode('=', $signatureParts[2], 2)[1]; 
  }

  $extractedSignatureResult['t'] = $timestamp;
  $extractedSignatureResult['v0'] = $v0Signature;
  $extractedSignatureResult['v1'] = $v1Signature;

  return $extractedSignatureResult;
}

function getRequestPath()
{
    $request_uri = explode('/', trim($_SERVER['REQUEST_URI'], '/'));
    return $request_uri;
}
?>