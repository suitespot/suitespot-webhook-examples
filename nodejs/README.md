# Webhook Validation Node Sample

## Disclaimer

This script is intended for sample purposes only and is not production ready.

### Prerequisites

* Node installation
* SuiteSpot application with webhooks configured for your company 

## Usage

This script is to be used as a reference to validating webhook messages from the SuiteSpot system.

1. Add a `.env` file with a value for the `SECRET`, this should be the secret provided for your company

2. Configure webhook events to be sent to `<YOUR_DOMAIN>/api.php/webhooks`
3. Start this server by executing `npm start` 
3. Trigger a configured webhook event

* Once the message is sent, this endpoint should respond with 200 and an object with a `isValid` field indicating whether or not the validation was successful or not *
