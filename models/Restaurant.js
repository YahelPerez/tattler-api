const mongoose = require('mongoose');

// Sub-schema for the address
const addressSchema = new mongoose.Schema({
  building: String,
  coord: [Number], // [longitude, latitude]
  street: String,
  zipcode: String
}, { _id: false });

// Sub-schema for grades
const gradeSchema = new mongoose.Schema({
    date: Date,
    score: Number
}, { _id: false });

// Sub-schema for comments
const commentSchema = new mongoose.Schema({
    date: Date,
    comment: String
    // Mongoose will add an _id to each comment automatically by default
});

// Main restaurant schema
const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  restaurant_id: { type: String, required: true },
  cuisine: { type: String, required: true },
  borough: String,
  address: addressSchema,
  grades: [gradeSchema],
  comments: [commentSchema] // <-- KEY FIELD ADDED!
});

// We create the model from the schema and export it
const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;