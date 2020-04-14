import UserRepository from '../repositories/userRepository';
import RequestRepository from '../repositories/requestRepository';

class RequestService {
  /**
   * @description directReport helps to find all a manager's direct report ids
   * @param {*} managerEmail
   * @returns {*} direct report ids
   */
  static async retrieveDirectReports({ email }) {
    try {
      const directReports = await UserRepository.findByLineManager(email);

      return directReports.map(({ id }) => id);
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * @description retrieveManagerRequests helps to find manager's requests
   * @param {Array} directReportIds
   * @param {Date} startDate
   * @param {Date} endDate
   * @returns {*} requestst
   */
  static async retrieveManagerStatistics(directReportIds, startDate, endDate) {
    try {
      const requests = await RequestRepository
        .findRequestByTimeframe(directReportIds, startDate, endDate);

      return requests;
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * @description retrieveTravelerStatistics helps to find traveler's requests
   * @param {Obj} userData
   * @param {Date} startDate
   * @param {Date} endDate
   * @returns {*} requestst
   */
  static async retrieveTravelerStatistics({ id }, startDate, endDate) {
    try {
      const requests = await RequestRepository
        .findRequestByTimeframe([id], startDate, endDate);

      return requests;
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * @description retrieveManagerRequests helps to find manager's requests
   * @param {Array} directReportIds
   * @param {obj} options
   * @param {*} limit
   * @param {*} offset
   * @returns {*} requestst
   */
  static async retrieveManagerRequests(directReportIds, options = {}, limit, offset) {
    try {
      const requests = await RequestRepository.findByIds(directReportIds, options, limit, offset);

      return requests;
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * @description retrieveManagerRequests helps to find manager's requests
   * @param {Array} directReportIds
   * @param {obj} id
   * @returns {*} requestst
   */
  static async retrieveManagerRequest(directReportIds, id) {
    try {
      const requests = await RequestRepository.findByIdsAndId(directReportIds, id);

      return requests;
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * @description retrieveAllRequests helps to find all requests
   * @param {obj} options
   * @param {*} limit
   * @param {*} offset
   * @returns {*} requestst
   */
  static async retrieveAllRequests(options, limit, offset) {
    try {
      const requests = await RequestRepository.findAll(options, limit, offset);

      return requests;
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * @description retrieveOneRequest helps to find requests by id
   * @param {*} options
   * @returns {*} requestst
   */
  static async retrieveOneRequest(options) {
    try {
      const requests = await RequestRepository.findOne(options);

      return requests;
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * @description approveRequest helps to find requests by id
   * @param {*} id
   * @returns {*} requestst
   */
  static async approveRequest(id) {
    try {
      const request = await RequestRepository.update({ id }, { status: 'Approved' });

      return request;
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * @description rejectRequest helps to find requests by id
   * @param {*} id
   * @returns {*} requestst
   */
  static async rejectRequest(id) {
    try {
      const request = await RequestRepository.update({ id }, { status: 'Rejected' });

      return request;
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default RequestService;
