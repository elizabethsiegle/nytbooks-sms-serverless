
// This is your new function. To start, set the name and path on the left.
const superagent = require('superagent');
let url;
exports.handler = function(context, event, callback) {
  // Here's an example of setting up some TWiML to respond to with this function
	let twiml = new Twilio.twiml.MessagingResponse();
  let inbMsg = event.Body.toLowerCase().trim();
  if(inbMsg.includes('bestsellers')) {
    url = 'https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json';
  }
  superagent.get(`${url}?api-key=${context.NYT_KEY}&list=Hardcover Fiction`)
  .end((err, res) => {
    let booksArr = [];
    res.body.results.books.forEach(book => {
      booksArr.push(book.title.toLowerCase());
    });
    twiml.message(booksArr.toString().replace(/,/g, ', '));
    callback(null, twiml);
  });
};