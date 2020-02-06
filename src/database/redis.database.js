import dotenv from 'dotenv';
import redis from 'redis';

dotenv.config();
const redisClient = redis.createClient();

export default redisClient;
