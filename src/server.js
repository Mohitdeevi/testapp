import dotenv from 'dotenv';
dotenv.config();
import app from './app.js';
import connectDB from './config/database.js';
import connectRedis from './config/redis.js';

const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Connect to Redis
connectRedis();

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
