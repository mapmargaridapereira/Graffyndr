//// Photo.model

const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    imageUrl: {
        type: String,
        required: true,
      },
  },
  {
    // this second object adds extra properties: createdAt and updatedAt
    timestamps: true,
  }
);

const Photo = model("Photo", userSchema);

module.exports = Photo;
