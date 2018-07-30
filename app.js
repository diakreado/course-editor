const express = require("express");
const path = require("path");
const favicon = require("static-favicon");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const routes = require("./routes/index");
const create = require("./routes/create");
const registration = require("./routes/registration");
const login = require("./routes/login");

const staticAsset = require("static-asset");

const config = require("./config");

// database
const mongoose = require("mongoose");
mongoose.set("debug", !config.IS_PRODUCTION);
mongoose.connect(
  config.MONGO_URL,
  { useNewUrlParser: true }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", function() {
  console.log("Connection to database open.");
});

// express
const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(favicon());
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(staticAsset(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", routes);
app.use("/create", create);
app.use("/registration", registration);
app.use("/login", login);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get("env") === "development") {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render("error", {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render("error", {
    message: err.message,
    error: {}
  });
});

module.exports = app;
