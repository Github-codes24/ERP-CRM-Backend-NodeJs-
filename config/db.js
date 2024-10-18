const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

// const mongoURL = process.env.MONGO;

const connectDB = async (mongoURL) => {
  try {
    await mongoose.connect(mongoURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, 
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

const connectToMongoDB = async (mongoURI) => {
  try {
    console.log("inde")
    // Check if already connected to MongoDB, if so, disconnect
    if (mongoose.connection.readyState === 1 || mongoose.connection.readyState === 2) {
      await mongoose.disconnect();
      console.log('Disconnected from the previous MongoDB cluster');
    }

    // Connect to the new MongoDB URI
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log(`Connected to new MongoDB`);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    throw error;
  }
};


module.exports = {connectDB, connectToMongoDB};
