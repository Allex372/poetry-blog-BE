const { Schema, model } = require("mongoose");

const commentScheme = new Schema(
  {
    userID: { type: Schema.Types.ObjectId, ref: 'users', required: true},
    text: { type: String, required: true },
    postID: { type: Schema.Types.ObjectId, ref: 'posts', required: true },
  },
  { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } }
);

module.exports = model("Comments", commentScheme);
