// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

// get date in Unix and UTC from the specified parameter
app.get('/api/:inputDate', (req, res) => {
  if (/^\d+$/.test(req.params.inputDate)) {
     var date = new Date(req.params.inputDate * 1000);
     date.setTime(date.getTime() / 1000);
  } else {
     var date = new Date(req.params.inputDate);
  }
  if (date.toUTCString() == "Invalid Date") {
    res.json({error : "Invalid Date"});
  } else {
  res.json({unix: date.getTime(),
           utc: date.toUTCString()});
  }
});

// return current date and time if no parameter specified
app.get('/api/', (req, res) => {
  let currentTime = new Date();
  res.json({unix: currentTime.getTime(),
           utc: currentTime.toUTCString()});
});