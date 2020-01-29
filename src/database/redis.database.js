import redis from 'redis';
import { exec } from 'child_process';// to start the redis database in development
// start redis as a child process
if (process.env.NODE_ENV === 'development') {
  const puts = (res, error, stdout) => {
    // eslint-disable-next-line no-console
    console.log(error);
    // eslint-disable-next-line no-console
    console.log(stdout);
  };
  exec('redis/src/redis-server redis/redis.conf', puts);
}
const redisClient = redis.createClient();
// process.env.REDIS_URL is the redis url config variable name on heroku.
// if local use redis.createClient()
redisClient.on('connect', () => {
  // eslint-disable-next-line no-console
  console.log('Redis client connected');
});
redisClient.on('error', (error) => {
  // eslint-disable-next-line no-console
  console.log('Redis not connected', error);
});
export default redisClient;
