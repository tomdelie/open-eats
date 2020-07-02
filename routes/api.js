const express = require('express');
const { db } = require('../src/javascripts/firebaseInit.js');

const router = express.Router();

router.get('/restaurants', async (req, res) => {
  const restaurantsDB = await db.collection('restaurants').get();
  const restaurants = [];

  restaurantsDB.forEach(restaurant => {
    restaurants.push({ id: restaurant.id, ...restaurant.data() });
  });

  res.status(200).send(restaurants);
});

router.get('/restaurants/:id', async (req, res) => {
  const restaurant = await db.collection('restaurants').doc(req.params.id).get();
  res.status(200).send(restaurant.data());
});

router.get('/restaurants/:id/products', async (req, res) => {
  const productsDB = await db.collection('restaurants').doc(req.params.id).collection('products').get();

  const products = [];

  productsDB.forEach(product => {
    products.push({ id: product.id, ...product.data() });
  });

  res.status(200).send(products);
});

router.get('/restaurants/:restaurantId/products/:productId', async (req, res) => {
  const product = await db.doc(`restaurants/${req.params.restaurantId}/products/${req.params.productId}`).get()
  res.status(200).send(product.data());
});

module.exports = router;
