const express = require('express');
const { firebaseApp: firebase, db } = require('../src/javascripts/firebaseInit.js');

const router = express.Router();

/* GET home page. */
router.get('/', async (req, res) => {
  const restaurants = await db.collection('restaurants').get();
  db.collection("restaurants").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().name}`);
    });
});
  res.render('index', { title: 'Express', session: firebase.auth().currentUser, type: 'success', message: req.query.supprimer, restaurants: restaurants });
});

module.exports = router;
