export const config = {
  mongoURI: process.env.MONGO_URI,
  redisURL: process.env.REDIS_URL,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiry: '15m',
  refreshTokenExpiry: '7d'
};
