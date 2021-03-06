// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//  Diners & Waitlist (DATA)
// =============================================================
var diners = [];

var waitlist = [];

var counter = 0;

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/add", function(req, res) {
  res.sendFile(path.join(__dirname, "add.html"));
});

app.get("/all", function(req, res) {
  res.sendFile(path.join(__dirname, "all.html"));
});

// Displays all diners
app.get("/api/diners", function(req, res) {
  var foo = [diners, waitlist];

  res.json(foo);
  
});

// Displays a single character, or returns false
// app.get("/api/characters/:character", function(req, res) {
//   var chosen = req.params.character;

//   console.log(chosen);

//   for (var i = 0; i < characters.length; i++) {
//     if (chosen === characters[i].routeName) {
//       return res.json(characters[i]);
//     }
//   }

//   return res.json(false);
// });

// Create New diners - takes in JSON input
app.post("/api/diners", function(req, res) {
  if(diners.length < 5) {
    var newCustomer = req.body;
    newCustomer.uniqueID = counter;
    counter++;
    diners.push(newCustomer);
  }
  else {
    var newCustomer = req.body;
    newCustomer.uniqueID = counter;
    counter++;
    waitlist.push(newCustomer);
  }

  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  var newdiners = req.body;

  res.json(newdiners);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
