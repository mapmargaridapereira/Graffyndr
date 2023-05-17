const express = require("express");
const router = express.Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

/* router.post("/", async (req, res) => {
  const { id } = req.params;
  const { title, author, description, location, existingImage } = req.body;

  const allPhotos = await Photo.find();
  const moreReviews = allPhotos.sort(
    (a, b) => b.reviews.length - a.reviews.length
  );
  const top1 = moreReviews[0];
  const top2 = moreReviews[1];
  const top3 = moreReviews[2];
  const top4 = moreReviews[3];

  const latestPhotos = allPhotos.sort((a, b) => b.createdAt - a.createdAt);
  const new1 = latestPhotos[0];
  const new2 = latestPhotos[1];
  const new3 = latestPhotos[2];
  const new4 = latestPhotos[3];

  res.render("index.hbs", { top1, top2, top3, top4, new1, new2, new3, new4 });
}); */
