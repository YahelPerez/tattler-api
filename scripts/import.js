// 1. Require necessary libraries
const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
require('dotenv').config(); // Loads environment variables from .env file

// 2. Configure the database connection from the .env file
const uri = process.env.MONGODB_URI; // Get the secure connection string
const dbName = 'tattlerDB';
const collectionName = 'restaurants';

// 3. Verify that the connection string (URI) has been loaded correctly
if (!uri) {
  console.error("Error: MONGODB_URI not found in .env file. Please check your .env file.");
  process.exit(1); // Stop the script if there is no URI
}

// 4. Define the path to the CSV file and prepare the array for the results
const csvFilePath = path.join(__dirname, 'restaurants.csv');
const results = [];

// 5. Main async function to run the script
async function run() {
  const client = new MongoClient(uri);

  try {
    // Connect to the MongoDB server
    await client.connect();
    console.log("Connected successfully to MongoDB server");

    const database = client.db(dbName);
    const collection = database.collection(collectionName);

    // Read and process the CSV file
    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on('data', (data) => {
        // Convert the rating to a number to ensure the data type is correct
        data.rating = parseFloat(data.rating); 
        results.push(data);
      })
      .on('end', async () => {
        console.log('CSV file successfully processed.');

        try {
          // Delete existing data in the collection to avoid duplicates
          await collection.deleteMany({});
          console.log('Existing data in the collection cleared.');

          // Insert the new data into the collection
          const insertResult = await collection.insertMany(results);
          console.log(`${insertResult.insertedCount} documents were inserted successfully.`);
          console.log('Data import finished!');
        
        } catch (err) {
            console.error("An error occurred during database operations:", err);
        } finally {
            // Close the connection
            await client.close();
            console.log("MongoDB connection closed.");
        }
      });

  } catch (err) {
    console.error("An error occurred while connecting to MongoDB:", err);
    await client.close();
  }
}

// 6. Run the main function
run().catch(console.dir);