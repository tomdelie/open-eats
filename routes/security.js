const express = require('express');
const router = express.Router();

router.get('/connexion', (req, res) => {
    res.render('security/signin');
});

router.get('/inscription', (req, res) => {
    res.render('security/signup');
});

module.exports = router;
