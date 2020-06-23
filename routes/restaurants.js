const express = require('express');
const { firebaseApp: firebase } = require('../src/javascripts/initFirebase.js');
const router = express.Router();

router.get('/:id', (req, res) => {
  res.render('restaurants/restaurant', {
    id: req.params.id,
    name: "McDonald's® (Paris Louvre Rivoli)",
    tags: 'American • Burgers • Fast Food',
    address: '184 Rue De Rivoli, PARIS, - 75001',
    bannerImage: '/images/mcdo-maxres.jpeg',
    session: firebase.auth().currentUser
  });
});

module.exports = router;
