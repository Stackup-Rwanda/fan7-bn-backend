import UserRepository from '../repositories/userRepository';

/**
 * @description AuthUtils authentication utility class
 */
class AuthUtils {
  /**
    *
    * @param {string} email
    * @returns {boolean} isEmailExists is true if email exists
    */
  static async emailExists({ email }) {
    const isEmailExists = await UserRepository.findByEmail(email);
    return !!isEmailExists;
  }
}

export default AuthUtils;
