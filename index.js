// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/:date?", function (req, res) {
  const { date } = req.params;
  console.log(new Date(date).toUTCString());
  function isDateInFormatYYYYMMDD(str) {
    // Verifica si la cadena tiene el formato "YYYY-MM-DD"
    const datePattern = /^\d{4}-\d{2}-\d{2}$/;
    return datePattern.test(str);
  }

  if (!date) {
    const now = Date.now();
    res.json({ unix: +now, utc: new Date(now).toUTCString() });
  }
  if (!isNaN(date)) {
    const utc = new Date(+date).toUTCString();
    res.json({ unix: +date, utc: utc });
  }
  if (isDateInFormatYYYYMMDD(date)) {
    const unix = new Date(date).getTime();
    res.json({ unix, utc: new Date(unix).toUTCString() });
  }
  if (!isNaN(Date.parse(date))) {
    const unix = new Date(date).getTime();
    res.json({ unix: +unix, utc: new Date(unix).toUTCString() });
  }
  res.json({ error: "Invalid Date" });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
