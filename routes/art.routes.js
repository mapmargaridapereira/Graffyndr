const express = require("express");
const router = express.Router();

const Photo = require("../models/Photo.model");
const User = require("../models/User.model");

const fileUploader = require("../config/cloudinary.config");
const isLoggedIn = require("../middleware/isLoggedIn");

//Submit new photo to the DB
// GET route to display the form for submission
router.get("/photos/submit", isLoggedIn, (req, res) => {
  res.render("pages/submit-photo.hbs");
});

// POST route to save a new photo to the database in the photos collection
router.post(
  "/photos/submit",
  isLoggedIn,
  fileUploader.single("imageUrl"),
  (req, res) => {
    const { title, author, description, location } = req.body;

    /*    if (req.file) {
    imageUrl= req.file.path
   } */

    async function submitPhotoToDb() {
      try {
        // Submiting the photo to DB
        let submittedPhoto = await Photo.create({
          title,
          author,
          description,
          location,
          imageUrl: req.file.path,
        });
        //Checking if Photo was submitted
        /*       console.log(`New photo submitted: ${submittedPhoto.title} `); */
        res.redirect("/gallery");
      } catch (error) {
        console.log(error);
      }
    }

    submitPhotoToDb();
  }
);

// GET route to retrieve and display all the photos
router.get("/gallery", (req, res) => {
  async function findAllPhotosFromDb() {
    try {
      // Find all the photos inside the collection
      let allPhotosFromDb = await Photo.find().populate("reviews");

      let ratingAverage = 0;
      let ratingLength = 0;
      for (let i = 0; i < allPhotosFromDb.length; i++) {
        for (let j = 0; j < allPhotosFromDb[i].reviews.length; j++) {
          ratingAverage += allPhotosFromDb[i].reviews[j].rating;
          ratingLength++;
        }
        allPhotosFromDb[i]["average"] = ratingAverage / ratingLength;
        ratingAverage = 0;
        ratingLength = 0;
      }

      //Check if photos are being retrieved
      /*       console.log("Retrieved photos from DB:", allPhotosFromDb); */

      //Render the photos in the DB to view
      res.render("pages/gallery.hbs", { gallery: allPhotosFromDb });
    } catch (error) {
      console.log(error);
    }
  }
  findAllPhotosFromDb();
});

////// display DETAILS of a specific Photo
router.get("/gallery/:photoId", (req, res) => {
  const { photoId } = req.params;

  async function findPhotoFromDb() {
    try {
      let foundPhoto = await Photo.findById(photoId).populate({
        path: "reviews",
        populate: {
          path: "author",
        },
      });
      res.render("pages/photo-details.hbs", { photo: foundPhoto });
    } catch (error) {
      console.log(error);
    }
  }
  findPhotoFromDb();
});

////// GET Route to Display a Form To EDIT
router.get("/gallery/:id/edit", isLoggedIn, (req, res) => {
  const { id } = req.params;

  async function getEditedPhoto() {
    try {
      let foundPhoto = await Photo.findById(id);
      res.render("pages/edit-photo.hbs", foundPhoto);
    } catch (error) {
      console.log(error);
    }
  }

  getEditedPhoto();
});

// POST Route to save the updated data
router.post(
  "/gallery/:id/edit",
  isLoggedIn,
  fileUploader.single("gallery-image"),
  (req, res) => {
    const { id } = req.params;

    const { title, author, description, location, existingImage } = req.body;

    let imageUrl;
    if (req.file) {
      imageUrl = req.file.path;
    } else {
      imageUrl = existingImage;
    }

    async function findPhotosAndUpdate() {
      try {
        let foundPhoto = await Photo.findByIdAndUpdate(
          id,
          { title, author, description, location, imageUrl },
          { new: true }
        );
        res.redirect("/gallery");
      } catch (error) {
        console.log(error);
      }
    }
    findPhotosAndUpdate();
  }
);

/* router.post('/gallery/:id/delete', (req, res)=>{
/*   const {photoId} = req.params;  

  async function deleteAPhotoFromDb(){
      try{
          let deletedPhoto = await Photo.findByIdAndDelete(id);
          res.redirect('/gallery');
      }
      catch(error){
          console.log(error);
      }
  }
  deleteAPhotoFromDb();
});*/

router.post("/photo/:id/delete", isLoggedIn, (req, res) => {
  const { id } = req.params;

  async function deletePhotoInDb() {
    try {
      const removedPhoto = await Photo.findByIdAndRemove(id);
      res.redirect("/user-profile");
    } catch (error) {
      console.log(error);
    }
  }

  deletePhotoInDb();
});

router.get("/create-your-route", isLoggedIn, (req, res) => {
  const userRoute =
    "pb=!1m35!1m12!1m3!1d49801.45865863744!2d-9.232864791384559!3d38.72719443175542!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m20!3e2!4m0!4m5!1s0xd1932d9d7cb7fd5%3A0x2a0c9acdae587c84!2sR.%20Francisco%20Ba%C3%ADa%202%2C%201500-580%20Lisboa!3m2!1d38.754888!2d-9.178765499999999!4m5!1s0xd1933436c95ec77%3A0xddbc780aeed7eeb1!2sCampo%20de%20Ourique%2C%20Lisboa!3m2!1d38.721322!2d-9.1672104!4m5!1s0xd1934a035e5e1a3%3A0x1db9559a3a7b956f!2sTapada%20das%20Necessidades%2C%20Cal%C3%A7ada%20Necessidades%2C%20Lisboa!3m2!1d38.7090051!2d-9.169833299999999!5e0!3m2!1spt-PT!2spt!4v1684239221642!5m2!1spt-PT!2spt";

  res.render("pages/create-your-route.hbs", {userRoute});
});

router.post("/create-your-route", isLoggedIn, async (req, res) => {
  const { itenerary, ride } = req.body;

  let locations;

  if (itenerary === "random") {
    const allPhotos = await Photo.find();
    for (let i = allPhotos.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = allPhotos[i];
      allPhotos[i] = allPhotos[j];
      allPhotos[j] = temp;
    }
    locations = allPhotos;
  } else if (itenerary === "fav") {
    const thisUser = await User.findById(req.session.currentUser._id).populate(
      "favPhoto"
    );
    locations = thisUser.favPhoto;
  } else if (itenerary === "rated") {
    const allPhotos = await Photo.find();
    const sortedPhotos = allPhotos.sort(
      (a, b) => b.reviews.length - a.reviews.length
    );
    locations = sortedPhotos;
  }

  const userRoute = `saddr=${locations[0].location}&daddr=${locations[1].location}&dirflg=${ride}`;

  res.render("pages/create-your-route.hbs", {userRoute});

  /*   res.redirect(
    `https://www.google.com/maps/dir//${locations[0].location}+Lisboa/${locations[1].location}+Lisboa/${locations[2].location}+Lisboa/${locations[3].location}+Lisboa/${locations[4].location}+Lisboa/dirflg/${ride}`
  ); 
  
    `https://www.google.com/maps/preview?saddr=${locations[0].location}&addr=${locations[1].location}&addr=${locations[2].location}&addr=${locations[3].location}&daddr=${locations[4].location}&dirflg=${ride}`
  
  */
});

module.exports = router;
