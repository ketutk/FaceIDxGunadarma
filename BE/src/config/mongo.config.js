const { Db, MongoClient } = require("mongodb");

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
