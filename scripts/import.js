// 1. Requerir las librerías
const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

// 2. Configurar la conexión a la base de datos
const uri = "mongodb+srv://yahelperez_db_user:3uvBkRtVr2eOicik@cluster0.20xcqwa.mongodb.net/"; 
const dbName = 'tattlerDB';
const collectionName = 'restaurants';

// 3. Definir la ruta al archivo CSV
const csvFilePath = path.join(__dirname, 'restaurants.csv');
const results = [];

// 4. Función principal asíncrona para ejecutar el script
async function run() {
  const client = new MongoClient(uri);

  try {
    // Conectar al servidor de MongoDB
    await client.connect();
    console.log("Connected successfully to MongoDB server");

    const database = client.db(dbName);
    const collection = database.collection(collectionName);

    // Leer y procesar el archivo CSV
    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on('data', (data) => {
        // Convertir el rating a número, si es necesario
        data.rating = parseFloat(data.rating); 
        results.push(data);
      })
      .on('end', async () => {
        console.log('CSV file successfully processed.');

        // Borrar datos existentes para evitar duplicados
        await collection.deleteMany({});
        console.log('Existing data cleared.');

        // Insertar los nuevos datos en la colección
        const insertResult = await collection.insertMany(results);
        console.log(`${insertResult.insertedCount} documents were inserted.`);
        console.log('Data imported successfully!');

        // Cerrar la conexión
        await client.close();
      });

  } catch (err) {
    console.error("An error occurred:", err);
    await client.close();
  }
}

// 5. Ejecutar la función
run().catch(console.dir);