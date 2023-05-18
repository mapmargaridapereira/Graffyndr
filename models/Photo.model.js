//// Photo.model

const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    title: {
      type: String,
    },
    author: {
      type: String,
    },
    description: {
      type: String,
    },
    location: {
      type: String,
    },
    imageUrl: {
      type: String,
    },
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
  },
  {
    // this second object adds extra properties: createdAt and updatedAt
    timestamps: true,
  }
);

const Photo = model("Photo", userSchema);

module.exports = Photo;
