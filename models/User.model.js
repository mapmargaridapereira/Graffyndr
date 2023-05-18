const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
    },
    about: {
      type: String,
    },
    imageUrl: {
      type: String,
    },
    reviews: [{
      type: Schema.Types.ObjectId, 
      ref: 'Review'
  }],
  favPhoto: [
    {
        type: Schema.Types.ObjectId,
        ref: 'Photo'
  }],
    
  },
  {
    // this second object adds extra properties: createdAt and updatedAt
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;