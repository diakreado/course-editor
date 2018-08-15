const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const URLSlugs = require("mongoose-url-slugs");
const tr = require("transliter");

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

taskSchema.plugin(
  URLSlugs("text", {
    field: "url",
    generator: text => tr.slugify(text)
  })
);
taskSchema.set("toJSON", {
  virtuals: true
});

module.exports = mongoose.model("Task", taskSchema);
