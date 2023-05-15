const express = require('express');
const router = express.Router();

const User = require("../models/User.model");

const fileUploader = require("../config/cloudinary.config");

// Require necessary (isLoggedOut and isLiggedIn) middleware in order to control access to specific routes
const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");

router.get('/user-profile', isLoggedIn, (req, res)=>{
    res.render('user/user-profile.hbs', {userInSession: req.session.currentUser});
  });

// Render a form to edit a User
router.get('/edit-user-profile/',isLoggedIn, (req,res)=>{
    const userId = req.params.id;

    async function getUserInfo(){
        try{
        let userInfo = await User.findById(userId);
        res.render('user/edit-user-profile.hbs', {userInSession: req.session.currentUser})
        } 
        catch(error){
            console.log(error);
        }
    }

    getUserInfo();
});

// Submit the edited user

router.post('/edit-user-profile/:id',isLoggedIn,fileUploader.single("imageUrl"), (req,res)=>{
    const userId = req.params.id; 

    const {username, about} = req.body;

    async function editUserInfo(){
        try{
            let editedUser = await User.findByIdAndUpdate(userId, {username, about, imageUrl: req.file.path});
            res.redirect('/user-profile');
        }
        catch(error){
            console.log(error);
        }
    }

    editUserInfo();
});

// GET route to retrieve and display all the users
router.get('/community', (req,res)=>{
    async function findAllUsersFromDb(){
      try{
          let allUsersFromDb = await User.find();
          res.render('pages/community.hbs', {community: allUsersFromDb});
      }
      catch(error){
          console.log(error);
      }
    }
    findAllUsersFromDb();
});
module.exports = router;