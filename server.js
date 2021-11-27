// Dependencies
// =============================================================
const express = require("express");
const exphbs = require("express-handlebars");
// Import routes and give the server access to them.

const routes = require("./controllers/jcb-controllers");


// process.env.PORT is for heroku
const PORT = process.env.PORT || 3000;

const app = express();

// this line allows the server to look for and use the public directory
app.use(express.static("public"));

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine(
  "handlebars",
  exphbs({ defaultLayout: "main" })
);
app.set("view engine", "handlebars");

app.use(routes);

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
  console.log("App listening on http://localhost:" + PORT);
});
