const express = require('express');
const { firebaseApp: firebase } = require('../src/javascripts/initFirebase.js');
const router = express.Router();

router.get('/deconnexion', (req, res) => {
  firebase.auth().signOut()
  .then(response => res.redirect('/'))
  .catch(error => console.log(error));
});

router.post('/connexion', (req, res) => {
  const { email, password } = req.body;

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(response => res.redirect('/'))
    .catch((error) => {
      if (error.code === 'auth/wrong-password') {
        res.render('security/signin', { type: 'error', message: 'Mauvais mot de passe.' });
      } else {
        res.render('security/signin', { type: 'error', message: error.message });
      }

      console.log(error);

    });
});

router.get('/connexion', (req, res) => {
  res.render('security/signin', { type: 'success', message: req.query.signup });
});

router.post('/inscription', (req, res) => {

  const { email, password, confirmPassword } = req.body;

  if (password === confirmPassword) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(response => {
        const encodedResponse = 'Vous avez été inscrit avec succès !';
        res.redirect(`/connexion?signup=${encodedResponse}`);
      })
      .catch((error) => {
        if (error.code == 'auth/weak-password') {
          res.render('security/signup', { type: 'error', message: 'Le mot de passe est trop faible.' });
        } else {
          res.render('security/signup', { type: 'error', message: error.message });
        }

        console.log(error);

      });
  } else {
    res.render('security/signup', { type: 'error', message: 'Les mots de passe ne sont pas identiques.' });
  }
});

router.get('/inscription', (req, res) => {
  res.render('security/signup');
});

module.exports = router;
