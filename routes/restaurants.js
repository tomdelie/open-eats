const express = require('express');
const { isLogin } = require('./security.js');
const { firebaseApp: firebase, db } = require('../src/javascripts/firebaseInit.js');
const router = express.Router();
const dayjs = require('dayjs');
require('dayjs/locale/fr');

router.get('/:id', async (req, res) => {
  const restaurant = await db.collection('restaurants').doc(req.params.id).get();
  const comments = await db.collection('restaurants').doc(req.params.id).collection('comments').orderBy('orderCreatedAt', 'desc').get();
  const products = await db.collection('restaurants').doc(req.params.id).collection('products').get();

  // ratings
  const ratings = [];
  let averageRating = null;
  let graphicalRating = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

  comments.forEach(comment => {
    const rating = parseInt(comment.data().rating, 10);
    ratings.push(rating);
    averageRating += rating;
    graphicalRating[rating]++;
  });

  Object.values(graphicalRating).forEach((rating, index) => {
    graphicalRating[index + 1] = rating ? (rating / ratings.length) * 100 : 0;
  });

  averageRating = averageRating / ratings.length;

  // bookmarks
  if (firebase.auth().currentUser) {
    let index = 0;
    const bookmarks = {};
    products.forEach(async product => {
      const bookmark = await db.collection('bookmarks').doc(firebase.auth().currentUser.uid).collection('products').doc(product.id).get();
      bookmarks[product.id] = bookmark.exists;

      if (index >= products.size - 1) {
        res.render('restaurants/restaurant', {
          restaurant: restaurant,
          comments: comments,
          session: firebase.auth().currentUser,
          ratings: { averageRating: averageRating, ratingLength: ratings.length, graphicalRating: graphicalRating },
          products: products,
          bookmarks: bookmarks
        });
      }

      index++;
    });
  } else {
    res.render('restaurants/restaurant', {
      restaurant: restaurant,
      comments: comments,
      session: firebase.auth().currentUser,
      ratings: { averageRating: averageRating, ratingLength: ratings.length, graphicalRating: graphicalRating },
      products: products
    });
  }
});

router.post('/:id/commentaire', isLogin, async (req, res) => {
  const { rating, comment } = req.body;

  db.collection('restaurants').doc(req.params.id).collection('comments').doc().set({
    content: comment,
    rating: rating,
    user: firebase.auth().currentUser.email,
    photoURL: firebase.auth().currentUser.photoURL,
    createdAt: dayjs(new Date()).locale('fr').format('DD MMMM YYYY à HH:mm'),
    orderCreatedAt: new Date()
  });

  res.redirect(`/restaurants/${req.params.id}`);
});

module.exports = router;
