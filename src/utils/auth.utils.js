import jwt from 'jsonwebtoken';
import 'dotenv';
import UserRepository from '../repositories/userRepository';

/**
 * @description AuthUtils authentication utility class
 */
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

  /**
   *
   * @param {string} email
   * @returns {boolean} isEmailExists is true if email exists
   */
  static async emailExists({ email }) {
    const isEmailExists = await UserRepository.findByEmail(email);
    return !!isEmailExists;
  }

  /**
   *
   * @param {string} email
   * @returns {boolean} isEmailExists is true if email exists
   */
  static async isVerified({ id }) {
    const { isVerified } = await UserRepository.findByUserId(id);
    return isVerified;
  }

  /**
   *
   * @param {number} id
   * @returns {boolean} check if super Administrator exists
   */
  static async loggedInUser(id) {
    const loggedInUser = await UserRepository.findById(id);
    return loggedInUser;
  }

  /**
   *
   * @param {obj} userData
   * @returns {boolean} isManager is true if user is a manager
   */
  static async isHost({ id }) {
    try {
      const isHost = await UserRepository.findByIdAndRole(id, 'host-supplier');
      const isTravelAdmin = await UserRepository.findByIdAndRole(id, 'travel-administrator');
      return !!isHost || !!isTravelAdmin;
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   *
   * @param {obj} userData
   * @returns {boolean} isManager is true if user is a manager
   */
  static async isHostSupplier({ id }) {
    try {
      const isHost = await UserRepository.findById(id);
      return isHost;
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   *
   * @param {obj} id
   * @returns {boolean} check if accomodation exist and belongs to the user
   */
  static async isAccommodation(id) {
    try {
      const isAccommodation = await UserRepository.findAccommodationById(id);
      return isAccommodation || undefined;
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   *
   * @param {obj} userData
   * @returns {boolean} isManager is true if user is a manager
   */
  static async isManager({ id }) {
    try {
      const isManager = await UserRepository.findByIdAndRole(id, 'manager');
      return !!isManager;
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   *
   * @param {obj} userData
   * @returns {boolean} isManager is true if user is a manager
   */
  static async isSuperAdmin({ id }) {
    try {
      const isSuperAdmin = await UserRepository.findByIdAndRole(id, 'super-administrator');
      return !!isSuperAdmin;
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   *
   * @param {obj} userData
   * @returns {boolean} isManager is true if user is a manager
   */
  static async isRequester({ id }) {
    try {
      const isRequester = await UserRepository.findByIdAndRole(id, 'requester');
      return !!isRequester;
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   *
   * @param {obj} data
   * @returns {boolean} check if room number exist an an accommodation
   */
  static async roomExist(data) {
    try {
      const roomExist = await UserRepository.findRoomWhere(data);
      return !!roomExist;
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   *
   * @param {obj}  data
   * @returns {dataValues} returns the matching room
   */
  static async isRoom(data) {
    try {
      const isRequester = await UserRepository.findByAccommodationIdAndRoomId(data);
      return isRequester;
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   *
   * @param {obj}  data
   * @returns {dataValues} returns the matching room
   */
  static async isRequest(data) {
    try {
      const isRequest = await UserRepository.findRequestById(data);
      return isRequest;
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default AuthUtils;
