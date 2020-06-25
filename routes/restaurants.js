const express = require('express');
const { firebaseApp: firebase, db } = require('../src/javascripts/firebaseInit.js');
const router = express.Router();

router.get('/:id', async (req, res) => {
  const restaurant = await db.collection('restaurants').doc(req.params.id).get();
  //const comments = restaurant.collection('comments').get();
  res.render('restaurants/restaurant', {
    restaurant: restaurant,
    //comments: comments,
    session: firebase.auth().currentUser
  });
});

router.post('/:id/commentaire', async (req, res) => {
  const { rating, comment } = req.body;
  console.log(req.body)
  db.collection('restaurants').doc(req.params.id).collection('comments').doc().set({
    comment: comment,
    rating: rating
  });
  const restaurant = await db.collection('restaurants').doc(req.params.id).get();
  res.redirect(`/restaurants/${id}`);
});

module.exports = router;
