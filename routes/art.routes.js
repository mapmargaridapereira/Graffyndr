const express = require('express');
const router = express.Router();

//Submit new photo to the DB
// GET route to display the form for submission
router.get('/photos/submit', (req,res)=>{
    res.render('pages/submit-photo.hbs');
});

// POST route to save a new photo to the database in the photos collection
router.post('/photos/submit', fileUploader.single("art-photo-image"), (req,res)=>{
   //console.log(req.body); 

   // destructuring the req.body object
   const {title, author, description, location, rating} = req.body;

   async function submitPhotoToDb(){
    try{
        // Submiting the photo to DB
        let submittedPhoto = await Photo.create({title, author, description, location, rating, imageUrl: req.file.path});
        //Checking if Photo was submitted
        console.log(`New photo submitted: ${submittedPhoto.title} `);
        res.redirect('/gallery');
    }
    catch(error){
        console.log(error);
    }
   }

   submitPhotoToDb();
});

// GET route to retrieve and display all the photos
router.get('/gallery', (req,res)=>{
    async function findAllPhotosFromDb(){
      try{
          // Find all the photos inside the collection 
          let allPhotosFromDb = await Photo.find();
  
         //Check if photos are being retrieved
        console.log('Retrieved photos from DB:', allPhotosFromDb);
  
        //Render the photos in the DB to view
          res.render('pages/gallery.hbs', {gallery: allPhotosFromDb});
      }
      catch(error){
          console.log(error);
      }
    }
    findAllPhotosFromDb();
});
