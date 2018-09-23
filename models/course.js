const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const courseSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
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

courseSchema.set("toJSON", {
  virtuals: true
});

module.exports = mongoose.model("Course", courseSchema);
