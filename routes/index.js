const express = require('express');
const { firebaseApp: firebase } = require('../src/javascripts/firebaseInit.js');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Express', session: firebase.auth().currentUser });
});

module.exports = router;
