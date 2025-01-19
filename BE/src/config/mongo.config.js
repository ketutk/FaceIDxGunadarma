const { Db, MongoClient } = require("mongodb");

/**
 * Creates and returns a MongoDB connection.
 *
 * @returns {Promise<[MongoClient, Db]>} A promise that resolves to a tuple containing:
 *   - [0] {MongoClient} The MongoDB client instance
 *   - [1] {Db} The database instance
 * @throws {Error} If the connection fails
 *
 * @example
 * try {
 *   const [client, db] = await mongoClient();
 *   // Use client and db here
 *   await client.close();
 * } catch (error) {
 *   console.error('Connection failed:', error);
 * }
 */
exports.mongoClient = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const client = new MongoClient(process.env.MONGO_URI);
      await client.connect();
      const db = client.db();
      resolve([client, db]);
    } catch (error) {
      reject(error);
    }
  });
};
