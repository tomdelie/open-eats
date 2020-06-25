const express = require('express');
const { firebaseApp: firebase, db } = require('../src/javascripts/firebaseInit.js');
const router = express.Router();

router.get('/:id', async (req, res) => {
  const restaurant = await db.collection('restaurants').doc(req.params.id).get();

  res.render('restaurants/restaurant', {
    restaurant: restaurant,
    session: firebase.auth().currentUser
  });
});

module.exports = router;
