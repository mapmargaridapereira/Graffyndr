// Express method to create routes and export them to app.js
const router = require('express').Router();

// Require Review Model 
const Review = require('../models/Review.model.js');



router.post('/review/create/:id', (req,res)=>{
    // Object destructuring
    // same as -> const id = req.params.id;
    const {id} = req.params; 

    // req.query --> queries of the form that was submitted via 'GET' method
    // req.body --> 'body' of the form that was submitted via 'POST' method
    const {content, author} = req.body;

    async function createReviewinDb(){
        try{
            // Create the Review
            const newReview = await Review.create({content, author});

            // Add the Review to the Book
            const bookUpdate = await Book.findByIdAndUpdate(id, {$push: {reviews: newReview._id}} );

            // Add the Review to the User
            const userUpdate = await User.findByIdAndUpdate(author, {$push: {reviews: newReview._id}} );

            res.redirect(/books/${id});
        }
        catch(error){
            console.log(error);
        };
    }

    createReviewinDb();

}); 


router.post('/review/delete/:id', (req, res)=>{
    // :id --> review's id
    const {id} = req.params; 

    async function deleteReviewInDb(){
        try{
            const removedReview = await Review.findByIdAndRemove(id);

            await User.findByIdAndUpdate(removedReview.author, {
                $pull: {reviews: removedReview._id}
            });

            res.redirect('/books');
        }
        catch(error){
            console.log(error)
        }
    }

    deleteReviewInDb();
})


// Export Routes
module.exports = router;