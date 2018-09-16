const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const uploadSchema = new Schema(
  {
    course: {
      type: Schema.Types.ObjectId,
      ref: "Course"
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    path: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

uploadSchema.set("toJSON", {
  virtuals: true
});

module.exports = mongoose.model("Upload", uploadSchema);
