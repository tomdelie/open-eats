const express = require('express');
const { firebaseApp: firebase, db } = require('../src/javascripts/firebaseInit.js');

const router = express.Router();

/* GET home page. */
router.get('/', async (req, res) => {
  const restaurants = await db.collection('restaurants').get();
  let index = 0;
  const restaurantsRating = {};
  restaurants.forEach(async (restaurant) => {
    let comments = await db.collection('restaurants').doc(restaurant.id).collection('comments').get();
    restaurantsRating[restaurant.id] = 0;

    comments.forEach(comment => {
      restaurantsRating[restaurant.id] += parseInt(comment.data().rating, 10) / comments.size;
    });

    restaurantsRating[restaurant.id] = restaurantsRating[restaurant.id].toFixed(1);

    if (index >= restaurants.size - 1) {
      res.render('index', { title: 'Express', session: firebase.auth().currentUser, type: 'success', message: req.query.supprimer, restaurants: restaurants, restaurantsRating: restaurantsRating });
    }

    index++;
  });

});

module.exports = router;
