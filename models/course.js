const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const URLSlugs = require("mongoose-url-slugs");
const tr = require("transliter");

const courseSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    discripiton: {
      type: String
    },
    logo: {
      type: String
    },
    complexity: {
      type: String
    },
    category: {
      type: String
    },
    authors: {
      type: String
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    published: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

courseSchema.plugin(
  URLSlugs("title", {
    field: "url",
    generator: text => tr.slugify(text)
  })
);
courseSchema.set("toJSON", {
  virtuals: true
});

module.exports = mongoose.model("Course", courseSchema);
