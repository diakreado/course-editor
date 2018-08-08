const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const URLSlugs = require("mongoose-url-slugs");
const tr = require("transliter");

const draftSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    discripiton: {
      type: String
    },
    complexity: {
      type: String
    },
    category: {
      type: String
    },
    author: {
      type: String
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  },
  {
    timestamps: true
  }
);

draftSchema.plugin(
  URLSlugs("title", {
    field: "url",
    generator: text => tr.slugify(text)
  })
);
draftSchema.set("toJSON", {
  virtuals: true
});

module.exports = mongoose.model("Draft", draftSchema);
