import dotenv from 'dotenv';
import models from '../models';
import DbErrorHandler from '../utils/dbErrorHandler';
import Response, { onError, onSuccess } from '../utils/response';
import RequestService from '../services/request.service';
import AuthUtils from '../utils/auth.utils';
import RequestRepository from '../repositories/requestRepository';
import RequestServices from '../services/trip.services';
import { eventEmitter } from '../utils/event.util';
import DestinationService from '../repositories/DestinationRepo';
import pagination from '../utils/pagination.utils';

dotenv.config();

const { Request, User, sequelize } = models;

// const eventEmitter = new EventEmitter();

class RequestController {
  /**
     * @description This helps Manager to reject trip request
     * @param  {object} req - The request object
     * @param  {object} res - The response object
     * @returns {object} The response object
     */
  static async rejectRequest(req, res) {
    const requestId = req.params.id;
    const Useremail = req.userData.email;

    const lineManager = await User.findOne({
      where: {
        email: Useremail
      }
    });

    if (lineManager.line_manager === Useremail) {
      const exist = await Request.findOne({
        where: {
          id: requestId
        }
      });
      if (exist) {
        await Request.update(
          {
            status: 'Rejected'
          },
          {
            where: {
              id: requestId
            },
            returning: false
          }
        );

        const notification = {
          eventType: 'rejected_request',
          requestId
        };

        eventEmitter.emit('notification', notification);

        return res.status(200).json({
          status: 200,
          message: 'Request rejected successfully',
        });
      }
      return res.status(404).json({
        status: 404,
        error: 'Sorry, the request you are looking for is not found',
      });
    }
    return res.status(401).json({
      status: 401,
      error: 'Unauthorized access',
    });
  }

  /**
   * @description This helps requester to create trip request
   * @param  {object} req - The request object
   * @param  {object} res - The response object
   * @returns {object} The response object
   */

  static async create(req, res, next) {
    try {
      const { userData } = req;
      const {
        origin,
        destination,
        travelDates,
        returnDate,
        reason,
        // eslint-disable-next-line camelcase
        accommodation_id,
        dob,
        passportName,
        passportNumber,
        gender
      } = req.value;
      const info = {
        user_id: userData.id,
        origin,
        accommodation_id,
        destination: Array.isArray(destination) ? destination : [destination],
        travel_date: Array.isArray(travelDates) ? travelDates : [travelDates],
        return_date: returnDate,
        reason,
        dob,
        passportName,
        passportNumber,
        gender
      };
      const { dataValues } = await Request.create(info);

      if (dataValues) {
        const notification = {
          eventType: 'created_request',
          requestId: dataValues.id
        };

        eventEmitter.emit('notification', notification);
        onSuccess(res, 201, 'Your request has sent successfully, wait for approval', dataValues);
      }

      return next();
    } catch (ex) {
      onError(res, 500, 'Internal Server Error');
    }
  }

  /**
   * @description This helps to find all requests
   * @param  {object} req - The request object
   * @param  {object} res - The response object
   * @returns  {object} The response object
   */
  static async getAll(req, res) {
    let requests;
    let response;
    try {
      const { userData } = req;
      const { limit, offset } = pagination(req.query);
      const isSuperAdmin = await AuthUtils.isSuperAdmin(userData);
      const isManager = await AuthUtils.isManager(userData);
      const isRequester = await AuthUtils.isRequester(userData);

      if (isSuperAdmin) requests = await RequestService.retrieveAllRequests({}, limit, offset);

      if (isManager) {
        const directReportIds = await RequestService.retrieveDirectReports(userData);
        if (directReportIds.length === 0) {
          response = new Response(res, 404, 'No direct report found for you');
          return response.sendErrorMessage();
        }

        requests = await RequestService.retrieveManagerRequests(directReportIds, {}, limit, offset);
      }

      if (isRequester) {
        requests = await RequestService
          .retrieveAllRequests({ user_id: userData.id }, limit, offset);
      }

      if (requests.length === 0) {
        response = new Response(res, 404, 'No requests found');
        return response.sendErrorMessage();
      }

      response = new Response(res, 200, 'All requests', requests);
      return response.sendSuccessResponse();
    } catch (error) {
      return DbErrorHandler.handleSignupError(res, error);
    }
  }

  /**
   * @description This helps to find all pending requests
   * @param  {object} req - The request object
   * @param  {object} res - The response object
   * @returns  {object} The response object
   */
  static async getByStatus(req, res) {
    let requests;
    let response;
    try {
      const { userData } = req;
      const { value } = req.params;
      const status = value.charAt(0).toUpperCase() + value.slice(1);
      const { limit, offset } = pagination(req.query);

      const isSuperAdmin = await AuthUtils.isSuperAdmin(userData);
      const isManager = await AuthUtils.isManager(userData);
      const isRequester = await AuthUtils.isRequester(userData);

      if (isSuperAdmin) {
        requests = await RequestService
          .retrieveAllRequests({ status }, limit, offset);
      }

      if (isManager) {
        const directReportIds = await RequestService.retrieveDirectReports(userData);
        if (directReportIds.length === 0) {
          response = new Response(res, 404, 'No direct report found for you');
          return response.sendErrorMessage();
        }

        requests = await RequestService
          .retrieveManagerRequests(directReportIds, { status }, limit, offset);
      }

      if (isRequester) {
        requests = await RequestService
          .retrieveAllRequests({ user_id: userData.id, status }, limit, offset);
      }

      if (requests.length === 0) {
        response = new Response(res, 404, 'No requests found');
        return response.sendErrorMessage();
      }
      response = new Response(res, 200, `All ${status} requests`, requests);
      return response.sendSuccessResponse();
    } catch (error) {
      return DbErrorHandler.handleSignupError(res, error);
    }
  }

  /**
   * @description This helps to find request by id
   * @param  {object} req - The request object
   * @param  {object} res - The response object
   * @returns  {object} The response object
   */
  static async getOne(req, res) {
    let request;
    let response;
    try {
      const id = parseInt(req.params.id, 10);
      const { userData } = req;

      const isSuperAdmin = await AuthUtils.isSuperAdmin(userData);
      const isManager = await AuthUtils.isManager(userData);
      const isRequester = await AuthUtils.isRequester(userData);

      if (isSuperAdmin) request = await RequestService.retrieveOneRequest({ id });

      if (isManager) {
        const directReportIds = await RequestService.retrieveDirectReports(userData);
        if (directReportIds.length === 0) {
          response = new Response(res, 404, 'No direct report found for you');
          return response.sendErrorMessage();
        }

        request = await RequestService.retrieveManagerRequest(directReportIds, id);
      }

      if (isRequester) {
        request = await RequestService.retrieveOneRequest({ user_id: userData.id, id });
      }

      if (!request) {
        response = new Response(res, 404, 'No requests found');
        return response.sendErrorMessage();
      }
      response = new Response(res, 200, 'All requests', request);
      return response.sendSuccessResponse();
    } catch (error) {
      return DbErrorHandler.handleSignupError(res, error);
    }
  }

  /**
   * @description This helps a manager to approve request created by his direct report
   * @param  {object} req - The request object
   * @param  {object} res - The response object
   * @returns  {object} The response object
   */
  static async approve(req, res) {
    try {
      const { userData } = req;
      const id = parseInt(req.params.id, 10);
      let response;
      const directReportIds = await RequestService.retrieveDirectReports(userData);
      const { user_id: userId, status } = await RequestRepository.findById(id);

      if (directReportIds.length === 0 || !userId || !directReportIds.includes(userId)) {
        response = new Response(res, 404, 'Request not found in your direct reports');
        return response.sendErrorMessage();
      }

      if (status === 'Approved') {
        response = new Response(res, 400, 'Request is already approved');
        return response.sendErrorMessage();
      }

      const request = await RequestService.approveRequest(id);

      await request[1].dataValues.destination.forEach((obj) => {
        sequelize.query(
          'UPDATE "Locations" SET visit_count = visit_count + 1 WHERE destination = :obj',
          {
            replacements: { obj: obj.toLowerCase() }
          }
        );
      });

      const notification = {
        eventType: 'approved_request',
        requestId: id
      };

      eventEmitter.emit('notification', notification);

      response = new Response(res, 200, 'Request is sucessfully approved', request[1]);
      return response.sendSuccessResponse();
    } catch (error) {
      return DbErrorHandler.handleSignupError(res, error);
    }
  }

  /** Function to search in the trip requests table according to what the user is typing
   * @param {object} req the request sent to the server
   * @param {object} res the response returned
   * @param {object} keyword to be searched for
   * @returns {object} found data
   */
  static async search(req, res) {
    const { keyword } = req.query;
    let response;
    try {
      const result = await RequestServices.search(keyword);
      if (result.length === 0) {
        response = new Response(res, 404, `Ooops. Nothing was found for ${keyword}`);
        return response.sendErrorMessage();
      }

      const data = [];
      result.forEach(obj => {
        const objData = {
          id: obj.id,
          first_nameorigin: obj.first_name,
          last_name: obj.last_name,
          origin: obj.origin,
          destination: obj.destination,
          travelDate: obj.travel_date,
          returnDate: obj.return_date,
          status: obj.status
        };
        data.push(objData);
      });
      response = new Response(res, 200, `The results for ${keyword}`, data);
      return response.sendSuccessResponse();
    } catch (error) {
      response = new Response(res, 500, `Internal Server Error: ${error}`);
      return response.sendErrorMessage();
    }
  }

  /**
   * @description This methods helps users edit requests that are still pending
   * @param  {object} req - The request object
   * @param  {object} res - The response object
   * @returns  {object} The response object
   */
  static async editRequest(req, res) {
    const { requestData } = req;
    const requestId = req.params.id;
    const userEmail = req.userData.email;
    const request = await Request.findOne({
      where: {
        id: requestId
      }
    });
    const user = await User.findOne({
      where: {
        email: userEmail
      }
    });
    if (!request) {
      return res.status(404).json({
        status: 404,
        error: 'Request not found',
      });
    }
    if (request.user_id === user.id) {
      if (request.status === 'Pending') {
        const updated = await RequestRepository.update({ id: requestId }, requestData);
        if (!updated) {
          return res.status(500).json({
            status: 500,
            error: 'Internal server error'
          });
        }

        const notification = {
          eventType: 'edited_request',
          requestId
        };

        eventEmitter.emit('notification', notification);

        return res.status(200).json({
          status: 200,
          message: 'Request edited successfully'
        });
      }
      return res.status(412).json({
        status: 412,
        error: 'Precondition failed',
      });
    }
    return res.status(401).json({
      status: 401,
      error: 'Unauthorized access',
    });
  }

  /**
   * @description This methods helps travelers and managers get statistics of
   * trips made in certain range of time
   * @param {object} req the request sent to the server
   * @param {object} res the response returned
   * @returns  {object} The response object
  */
  static async getTripStatistics(req, res) {
    let tripStatistics;
    let response;
    try {
      const { userData } = req;
      const { startDate, endDate } = req.searchDates;
      const minDate = new Date(startDate);
      const maxDate = new Date(endDate);
      maxDate.setHours(
        maxDate.getHours() + 23,
        maxDate.getMinutes() + 59,
        maxDate.getSeconds() + 59,
        maxDate.getMilliseconds() + 999
      );

      const isManager = await AuthUtils.isManager(userData);
      const isTraveler = await AuthUtils.isRequester(userData);

      if (isManager) {
        const directReportIds = await RequestService.retrieveDirectReports(userData);
        if (directReportIds.length === 0) {
          response = new Response(res, 404, 'No direct report found for you');
          return response.sendErrorMessage();
        }

        tripStatistics = await RequestService
          .retrieveManagerStatistics(directReportIds, minDate, maxDate);
      }

      if (isTraveler) {
        tripStatistics = await RequestService
          .retrieveTravelerStatistics(userData, minDate, maxDate);
      }

      if (tripStatistics === 0) {
        response = new Response(res, 404, `There were no trip requests made from: ${startDate} to: ${endDate}`);
        return response.sendErrorMessage();
      }

      response = new Response(res, 200, `Trip requests statistics from: ${startDate} to: ${endDate}`, { count: tripStatistics });
      return response.sendSuccessResponse();
    } catch (error) {
      return DbErrorHandler.handleSignupError(res, error);
    }
  }

  /**
 * @description This methods helps users get info of most travelled destinations
 * @param  {object} req - The request object
 * @param  {object} res - The response object
 * @returns  {object} The response object
 */
  static async MostTravelledDestination(req, res) {
    const Destinations = await DestinationService.FetchAllDestinations();
    const Requests = await DestinationService.AllRequests();

    return res.status(200).json({
      status: 200,
      message: 'Destinations info',
      Requaests: `Total trip requests are ${Requests} requests`,
      most_travelled_destinations: Destinations,
      data: {
        Requests: `Total trip requests are ${Requests} requests`,
        Destinations
      }
    });
  }
}

export default RequestController;
