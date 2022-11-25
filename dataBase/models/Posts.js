const { Schema, model } = require("mongoose");

const postScheme = new Schema(
  {
    title: { type: String, required: true },
    userID: { type: Schema.Types.ObjectId, ref: "users", required: true },
    text: { type: String, required: true },
    picture: { type: String },
    userName: { type: String, required: true },
    photoPublicId: { type: String },
  },
  { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } }
);

module.exports = model("Posts", postScheme);
