var mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  title: {
    type: String,
    required: true
  },
  discripiton: {
    type: String
  }
});

module.exports = mongoose.model("Post", schema);
