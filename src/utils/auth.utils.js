import jwt from 'jsonwebtoken';
import 'dotenv';

class AuthUtils {
  /**
   * @function jwtVerify
   * @param {String} token String
   * @returns {Object} decoded token
   */
  static jwtVerify(token) {
    const decodedToken = jwt.verify(token, process.env.KEY);
    return decodedToken;
  }
}

export default AuthUtils;
