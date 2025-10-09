const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

app.use(express.json());

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log("¡Successfully connected to MongoDB Atlas!");
    
    app.listen(PORT, () => {
      console.log(`Server running on the port ${PORT}`);
    });
  })
  .catch(err => {
    console.error("Error connecting to MongoDB:", err);
  });

app.get('/', (req, res) => {
  res.send('Hello! Tattlers API is working.');
});

// Connect restaurant routes
app.use('/api/restaurants', require('./routes/restaurants'));