const mongoose = require('mongoose');

const MONGO_URL = process.env.MONGO_URI;

mongoose.connection.once('open', () => {
  console.log('mongodb connected');
});

mongoose.connection.on('error', (err) => {
  console.error(err);
});

async function mongoConnect() {
  try {
    await mongoose.connect(MONGO_URL);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}

async function mongoDisconnect() {
  await mongoose.disconnect();
}

module.exports = {
  mongoConnect,
  mongoDisconnect
};
