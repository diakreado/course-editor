var mongoose = require("mongoose");
var config = require("./config.js");

module.exports = () => {
  return new Promise((resolve, reject) => {
    mongoose.connection
      .on("error", error => reject(error))
      .on("close", () => console.log("Database connection closed."))
      .once("open", () => resolve(mongoose.connection[0]));

    mongoose.connect(
      config.MONGO_URL,
      { useNewUrlParser: true }
    );
  });
};
