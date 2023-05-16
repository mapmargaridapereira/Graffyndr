// Express method to create routes and export them to app.js
const router = require("express").Router();

// Require Review Model
const Review = require("../models/Review.model");
const User = require("../models/User.model");
const Photo = require("../models/Photo.model");

router.post("/review/create/:id", (req, res) => {
  // Object destructuring
  // same as -> const id = req.params.id;
  const { id } = req.params;
  const authorId = req.session.currentUser._id;

  // req.query --> queries of the form that was submitted via 'GET' method
  // req.body --> 'body' of the form that was submitted via 'POST' method
  const { rating, content } = req.body;

  async function createReviewinDb() {
    try {
      // Create the Review
      const newReview = await Review.create({
        rating,
        content,
        author: authorId,
      });
      const newReviewId = newReview._id;

      // Add the Review to the User
      const userUpdate = await User.findByIdAndUpdate(authorId, {
        $push: { reviews: newReviewId },
      });

      const photoUpdate = await Photo.findByIdAndUpdate(id, {
        $push: { reviews: newReviewId },
      });

      res.redirect(`/gallery/${id}`);
    } catch (error) {
      console.log(error);
    }
  }

  createReviewinDb();
});

router.post("/review/delete/:id", (req, res) => {
  // :id --> review's id
  const { id } = req.params;

  async function deleteReviewInDb() {
    try {
      const removedReview = await Review.findByIdAndRemove(id);

      await User.findByIdAndUpdate(removedReview.author, {
        $pull: { reviews: removedReview._id },
      });

      res.redirect("/reviews");
    } catch (error) {
      console.log(error);
    }
  }

  deleteReviewInDb();
});

// Export Routes
module.exports = router;
