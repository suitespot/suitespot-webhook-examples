# Webhook Validation Node Sample

## Disclaimer

This script is intended for sample purposes only and is not production ready.

### Prerequisites

* Node installation
* SuiteSpot application with webhooks configured for your company 

## Usage

This script is to be used as a reference to validating webhook messages from the SuiteSpot system.

1. Get the `SECRET` shared with your from SuiteSpot
2. Configure webhook events to be sent to `<YOUR_DOMAIN>/api/webhook`
3. Start this server by executing `SECRET="<PUT_SECRET_HERE>" npm start` 
3. Trigger a configured webhook event, this server will response with `isValid: true|false` depending on if the signature verification passes or not

Once the signature if verified continue with any processing required and return a 200 status code to tell the webhook provider the message was accepted
