# Webhook Validation PHP Sample

## Disclaimer

This script is intended for sample purposes only and is not production ready.

### Prerequisites

* PHP Server
* SuiteSpot application with webhooks configured for your company 

## Usage

This script is to be used as a reference to validating webhook messages from the SuiteSpot system.

1. Replace the `<SIGNING_SECRET>` with the secret provided for your company
2. Configure webhook events to be sent to `<YOUR_DOMAIN>/api.php/webhooks`
3. Trigger a configured webhook event

* Once the message is sent, this endpoint should response with either `Webhook event received, Verification successful` if the message validation was success OR `Webhook event received, Verification unsuccessful` if the message wasn't able to be validated. *
