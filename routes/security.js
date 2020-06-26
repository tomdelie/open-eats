const express = require('express');
const { storageRef, firebaseApp: firebase } = require('../src/javascripts/firebaseInit.js');
const { NotExtended } = require('http-errors');
const router = express.Router();
const multer = require('multer');

const uploader = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // keep images size < 5 MB
  },
});

const isLogin = (req, res, next) => {
  if (firebase.auth().currentUser) {
    next();
  } else {
    res.redirect('/connexion');
  }
}

router.get('/deconnexion', isLogin, (req, res) => {
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

router.get('/parametres', isLogin, (req, res) => {
  res.render('security/parameters', { session: firebase.auth().currentUser });
});

router.post('/parametres', isLogin, uploader.single('avatar'), (req, res) => {
  if (!req.file) {
    res.render('security/parameters', { type: 'error', message: 'Aucun fichier n\'a été chargé.', session: firebase.auth().currentUser });
  } else {
    const user = firebase.auth().currentUser;
    const ref = storageRef.child(`avatars/${user.uid}/${req.file.originalname}`);

    ref.put(req.file.buffer).then((snapshot) => {
      snapshot.ref.getDownloadURL().then((url) => {
        user.updateProfile({
          photoURL: url
        }).then(() => {
          res.render('security/parameters', { type: 'success', message: 'Votre avatar a bien été mis à jour.', session: user });
        })
      });
    });
  }
});

router.get('/parametres/supprimer', isLogin, (req, res) => {
  firebase.auth().currentUser.delete()
  .then(() => {
    const encodedResponse = 'Votre compte a bien été supprimé.';
    res.redirect(`/?supprimer=${encodedResponse}`);
  }).catch((error) => {
    const encodedResponse = `Erreur : ${error}`;
    res.redirect(`/?supprimer=${encodedResponse}`);
  });
});

module.exports = { router, isLogin };
