var mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    login: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

userSchema.set("toJSON", {
  virtuals: true
});

module.exports = mongoose.model("User", userSchema);
