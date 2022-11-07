const { Schema, model } = require("mongoose");

const postScheme = new Schema(
  {
    title: { type: String, required: true },
    userID: { type: String, required: true},
    text: { type: String, required: true },
    picture: { type: String },
  },
  { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } }
);

module.exports = model("Posts", postScheme);
