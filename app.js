const express = require("express");
const path = require("path");
const favicon = require("static-favicon");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const index = require("./routes/index");
const create = require("./routes/create");
const edit = require("./routes/edit");
const auth = require("./routes/auth");
const course = require("./routes/course/course");
const lesson = require("./routes/course/lesson");
const task = require("./routes/course/task");
const uploads = require("./routes/uploads");
const myCourses = require("./routes/my-courses");

const staticAsset = require("static-asset");

const config = require("./config");

const session = require("express-session");
const MongoStore = require("connect-mongo")(session);

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

app.use(
  session({
    secret: config.SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
      mongooseConnection: mongoose.connection
    })
  })
);

app.use("/", index);
app.use("/create", create);
app.use("/edit", edit);
app.use("/auth", auth);
app.use("/course", course);
app.use("/lesson", lesson);
app.use("/task", task);
app.use("/uploads", uploads);
app.use("/my-courses", myCourses);

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
