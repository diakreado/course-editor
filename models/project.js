var mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    discripiton: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

projectSchema.set("toJSON", {
  virtuals: true
});

module.exports = mongoose.model("Post", projectSchema);
