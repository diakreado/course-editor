const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const lessonSchema = new Schema(
  {
    curse: {
      type: Schema.Types.ObjectId,
      ref: "Course"
    },
    number: {
      type: Number
    },
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
    duration: {
      type: Number
    }
  },
  {
    timestamps: true
  }
);

lessonSchema.set("toJSON", {
  virtuals: true
});

module.exports = mongoose.model("Lesson", lessonSchema);
