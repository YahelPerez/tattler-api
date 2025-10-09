const express = require('express');
const router = express.Router();
const Restaurant = require('../models/Restaurant');

// --- ENDPOINTS ---

// GET ALL RESTAURANTS
// GET /api/restaurants/
router.get('/', async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.json(restaurants);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// CREATE A NEW RESTAURANT
router.post('/', async (req, res) => {
  const restaurant = new Restaurant({
    name: req.body.name,
    cuisine: req.body.cuisine, 
    borough: req.body.borough,
    address: req.body.address,
    grades: req.body.grades
  });

  try {
    const newRestaurant = await restaurant.save();
    res.status(201).json(newRestaurant);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;