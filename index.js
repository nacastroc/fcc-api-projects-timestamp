// index.js
// where your node app starts

// init project
let express = require('express');
let app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
let cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// Log all requests to console.
app.use(function (req, res, next) {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
})

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});

app.get('/api/:date?', function (req, res) {
  let date = req.params.date
  try {
    if (!date) {
      date = new Date()
      const response = {
        unix: date.getTime(),
        utc: date.toUTCString()
      }
      res.json(response)
    } else {
      const unix = +date
      const dateObj = !!unix ? new Date(unix) : new Date(date)
      const valid = dateObj.getTime() > 0
      if (!valid) {
        throw new Error("Invalid Date")
      } else {
        res.json({
          unix: dateObj.getTime(),
          utc: dateObj.toUTCString()
        })
      }
    }
  } catch (error) {
    res.json({ error: "Invalid Date" })
  }
})

// listen for requests :)
let listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

module.exports = app;