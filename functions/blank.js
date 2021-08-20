
// This is your new function. To start, set the name and path on the left.
const superagent = require('superagent');
let url;
exports.handler = function(context, event, callback) {
  // TWiML to respond to with this function
	let twiml = new Twilio.twiml.MessagingResponse();
  let inbMsg = event.Body.toLowerCase().trim();
  //get bestsellers
  if(inbMsg.includes('bestsellers')) {
    url = 'https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json';
    superagent.get(`${url}?api-key=${context.NYT_KEY}&list=Hardcover Fiction`)
    .then(res => {
      let booksArr = [];
      res.body.results.books.forEach(book => {
        booksArr.push(book.title.toLowerCase()); //get title of books
      });
      twiml.message(booksArr.toString().replace(/,/g, ', '));
      callback(null, twiml);
    })
    .catch(err => {
      twiml.message(`Error: ${err.message}`);
      callback(null, twiml);
    });
  }
  //get review from input SMS of title and author (must be title followed by author followed by "review")
  else if(inbMsg.includes('review')) {
    url = 'https://api.nytimes.com/svc/books/v3/reviews.json';
    let reviewInput = inbMsg.split(' ');
    let author = reviewInput[1] + ' ' + reviewInput[2];
    superagent.get(`${url}?api-key=${context.NYT_KEY}&title=${reviewInput[0]}&author=${author}`)
    .then(res => {
      let reviewArr = [];
      res.body.results.forEach(review => {
        reviewArr.push({url:review.url, publish_date:review.publication_dt});
      });
      twiml.message(JSON.stringify(reviewArr)); //TODO: clean up this array/obj lmao
      callback(null, twiml);
    })
    .catch(err => {
      twiml.message(`Send the book title followed by author followed by the word \"review\", all separated by spaces`);
      callback(null, twiml);
    });
  }
};