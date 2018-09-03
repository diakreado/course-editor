const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema(
  {
    lesson: {
      type: Schema.Types.ObjectId,
      ref: "Lesson"
    },
    number: {
      type: Number
    },
    instructions: {
      type: String,
      required: true
    },
    text: {
      type: String
    },
    sound: {
      type: String
    },
    pitch: {
      type: String
    },
    textMarkup: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

taskSchema.set("toJSON", {
  virtuals: true
});

module.exports = mongoose.model("Task", taskSchema);
