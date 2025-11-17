const mongoose = require('mongoose');
const { env } = require('./environment');

mongoose.set('strictQuery', true);

let connection;

async function connectDatabase() {
  if (connection) {
    return connection;
  }

  try {
    connection = await mongoose.connect(env.mongoUri, {
      serverSelectionTimeoutMS: 5000
    });
    console.log('Connected to MongoDB');
    return connection;
  } catch (error) {
    connection = null;
    console.error('Failed to connect to MongoDB', error);
    throw error;
  }
}

module.exports = { connectDatabase };
