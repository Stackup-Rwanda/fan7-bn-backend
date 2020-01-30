import redis from 'redis';

const redisClient = redis.createClient();
// process.env.REDIS_URL is the redis url config variable name on heroku.
redisClient.on('connect', () => {
  // eslint-disable-next-line no-console
  console.log('Redis client connected');
});
redisClient.on('error', (error) => {
  // eslint-disable-next-line no-console
  console.log('Redis not connected', error);
});
export default redisClient;
