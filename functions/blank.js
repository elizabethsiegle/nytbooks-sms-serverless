
// This is your new function. To start, set the name and path on the left.
const superagent = require('superagent');
let url;
exports.handler = function(context, event, callback) {
  // Here's an example of setting up some TWiML to respond to with this function
	let twiml = new Twilio.twiml.MessagingResponse();
  let inbMsg = event.Body.toLowerCase().trim();
  if(inbMsg.includes('bestsellers')) {
    url = 'https://api.nytimes.com/svc/books/v3/lists.json';
  }
  // const message = twiml.message();
  superagent.get(`${url}?api-key=${context.NYT_KEY}&list=Hardcover Fiction`)
  .end((err, res) => {
    twiml.message(JSON.stringify(res.body.results[0].book_details));
    callback(null, twiml);
  });

  // This callback is what is returned in response to this function being invoked.
  // It's really important! E.g. you might respond with TWiML here for a voice or SMS response.
  // Or you might return JSON data to a studio flow. Don't forget it!
};