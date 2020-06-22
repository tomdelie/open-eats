const express = require('express');
const router = express.Router();

router.get('/:id', (req, res) => {
  res.render('restaurants/restaurant', {
    id: req.params.id,
    name: "McDonald's® (Paris Louvre Rivoli)",
    tags: 'American • Burgers • Fast Food',
    address: '184 Rue De Rivoli, PARIS, - 75001',
    bannerImage: '/images/mcdo-maxres.jpeg'
  });
});

module.exports = router;
