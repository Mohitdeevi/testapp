import Redis from 'ioredis';
import { config } from './index.js';

const connectRedis = () => {
  const redis = new Redis(config.redisURL);
  redis.on('connect', () => {
    console.log('Redis connected');
  });
  redis.on('error', (err) => {
    console.error('Redis connection error:', err);
  });
  return redis;
};

export default connectRedis;
