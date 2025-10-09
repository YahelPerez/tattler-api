// 1. Requerir las librerías
const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

// 2. Configure the database connection
const uri = "mongodb+srv://yahelperez_db_user:3uvBkRtVr2eOicik@cluster0.20xcqwa.mongodb.net/"; 
const dbName = 'tattlerDB';
const collectionName = 'restaurants';

// 3. Define the path to the CSV file
const csvFilePath = path.join(__dirname, 'restaurants.csv');
const results = [];

// 4. Asynchronous main function to execute the script
async function run() {
  const client = new MongoClient(uri);

  try {
    // Connect to MongoDB Server
    await client.connect();
    console.log("Connected successfully to MongoDB server");

    const database = client.db(dbName);
    const collection = database.collection(collectionName);

    // Read and process the CSV file
    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on('data', (data) => {
        // Convert the rating to a number, if necessary
        data.rating = parseFloat(data.rating); 
        results.push(data);
      })
      .on('end', async () => {
        console.log('CSV file successfully processed.');

        // Erase existing data to avoid duplicates
        await collection.deleteMany({});
        console.log('Existing data cleared.');

        // Insert the new data into the collection
        const insertResult = await collection.insertMany(results);
        console.log(`${insertResult.insertedCount} documents were inserted.`);
        console.log('Data imported successfully!');

        // Close the connection
        await client.close();
      });

  } catch (err) {
    console.error("An error occurred:", err);
    await client.close();
  }
}

// 5. Execute the function
run().catch(console.dir);