const express = require('express');
const router = express.Router();
const Restaurant = require('../models/Restaurant'); // Import the Restaurant model

// --- ENDPOINTS ---

/**
 * GET /api/restaurants/
 * Get all restaurants. Can be filtered by query parameters.
 * Example: /api/restaurants?name=Brunos&cuisine=American
 */
router.get('/', async (req, res) => {
  try {
    const query = {}; // Start with a base query object

    // Logic for searching by name
    if (req.query.name) {
      // Use $regex for partial, case-insensitive matching
      query.name = { $regex: req.query.name, $options: 'i' };
    }
    // Logic for filtering by 'borough'
    if (req.query.borough) {
      query.borough = req.query.borough;
    }
    // Logic for filtering by 'cuisine'
    if (req.query.cuisine) {
      query.cuisine = req.query.cuisine;
    }

    const restaurants = await Restaurant.find(query);
    res.json(restaurants);
    
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * GET /api/restaurants/:id
 * Get a single restaurant by its ID.
 */
router.get('/:id', async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id);
        if (!restaurant) {
            return res.status(404).json({ message: 'Restaurant not found' });
        }
        res.json(restaurant);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

/**
 * POST /api/restaurants/
 * Create a new restaurant.
 */
router.post('/', async (req, res) => {
  const restaurant = new Restaurant({
    name: req.body.name,
    restaurant_id: req.body.restaurant_id,
    cuisine: req.body.cuisine,
    borough: req.body.borough,
    address: req.body.address,
    grades: req.body.grades,
    comments: req.body.comments
  });

  try {
    const newRestaurant = await restaurant.save();
    res.status(201).json(newRestaurant); // 201 means "Successfully Created"
  } catch (err) {
    res.status(400).json({ message: err.message }); // 400 means "Bad Request"
  }
});

/**
 * PUT /api/restaurants/:id
 * Update a restaurant by its ID.
 */
router.put('/:id', async (req, res) => {
  try {
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(
      req.params.id, // The ID of the restaurant to update
      req.body,      // The object with the fields to modify
      { new: true }  // This option returns the updated document
    );

    if (!updatedRestaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    res.json(updatedRestaurant);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/**
 * DELETE /api/restaurants/:id
 * Delete a restaurant by its ID.
 */
router.delete('/:id', async (req, res) => {
  try {
    const deletedRestaurant = await Restaurant.findByIdAndDelete(req.params.id);

    if (!deletedRestaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    res.json({ message: 'Restaurant deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;