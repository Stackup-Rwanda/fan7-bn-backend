import 'dotenv';
import redisClient from '../database/redis.database';
import AuthUtils from '../utils/auth.utils';
import userRepository from '../repositories/userRepository';

/**
 * @description AuthMiddleware checks if the token was loggedout or not
 */
class AuthMiddleware {
  /**
   *
   * @param { obj } req
   * @param { obj } res
   * @param { function } next
   * @returns { * } null
   */
  static async verifyToken(req, res, next) {
    try {
      const token = req.headers.token.split(' ')[1];
      const payload = AuthUtils.jwtVerify(token);
      redisClient.get('token', (err, userToken) => {
        const user = userRepository.findByEmail(payload.email);
        if (!user) {
          return res.status(400).json({ status: 400, error: 'invalid token' });
        }
        if (token === userToken) {
          return res.status(401).json({ status: 401, error: 'Please login required' });
        }

        next();
      });
    } catch (ex) {
      return res.status(400).json({ status: 400, error: 'invalid token' });
    }
  }
}

export default AuthMiddleware;
