### Built on Twitch 8/19

Text "bestsellers" to +12155156567 to get the top 15 books on the NYT bestselling hardcover list using the [NYT Books API](https://developer.nytimes.com/docs/books-product/1/overview), [Twilio Functions](https://www.twilio.com/docs/runtime/functions), and the [Twilio Serverless Toolkit](https://www.twilio.com/docs/labs/serverless-toolkit)

JS code is in `functions/blank.js`. To run the code, you will need to install the Twilio Serverless Toolkit.
```bash
npm install twilio-cli -g
twilio login
twilio plugins:install @twilio-labs/plugin-serverless
```
Install the lone requirement
```bash
npm install superagent
```
In the root directory, deploy the Twilio Serverless app with 
```bash
twilio serverless:deploy
```
Grab the URL ending with `/blank` and configure a Twilio phone number with it so you can text the number and get a response back! Otherwise, you can hit the NYT API URL in Postman to get some data back.
