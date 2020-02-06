import model from '../models';
import DbErrorHandler from '../utils/dbErrorHandler';
import Response, { onError, onSuccess } from '../utils/response';
import RequestService from '../services/request.service';
import AuthUtils from '../utils/auth.utils';
import RequestRepository from '../repositories/requestRepository';


const { Request, User } = model;

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

  static async create(req, res, next) {
    try {
      const { userData } = req;
      const {
        origin,
        destination,
        travelDate,
        returnDate,
        reason,
        accommodationId,
        dob,
        passportName,
        passportNumber,
        gender
      } = req.body;
      const info = {
        user_id: userData.id,
        origin,
        destination,
        travel_date: travelDate,
        return_date: returnDate,
        reason,
        accommodation_id: accommodationId,
        dob,
        passportName,
        passportNumber,
        gender
      };
      const { dataValues } = await Request.create(info);
      if (dataValues) onSuccess(res, 201, 'Your request has sent successfully, wait for approval');
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

      const isSuperAdmin = await AuthUtils.isSuperAdmin(userData);
      const isManager = await AuthUtils.isManager(userData);
      const isRequester = await AuthUtils.isRequester(userData);

      if (isSuperAdmin) requests = await RequestService.retrieveAllRequests();

      if (isManager) {
        const directReportIds = await RequestService.retrieveDirectReports(userData);
        if (directReportIds.length === 0) {
          response = new Response(res, 404, 'No direct report found for you');
          return response.sendErrorMessage();
        }

        requests = await RequestService.retrieveManagerRequests(directReportIds);
      }

      // eslint-disable-next-line max-len
      if (isRequester) requests = await RequestService.retrieveAllRequests({ user_id: userData.id });

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

      const isSuperAdmin = await AuthUtils.isSuperAdmin(userData);
      const isManager = await AuthUtils.isManager(userData);
      const isRequester = await AuthUtils.isRequester(userData);

      if (isSuperAdmin) requests = await RequestService.retrieveAllRequests({ status });

      if (isManager) {
        const directReportIds = await RequestService.retrieveDirectReports(userData);
        if (directReportIds.length === 0) {
          response = new Response(res, 404, 'No direct report found for you');
          return response.sendErrorMessage();
        }

        requests = await RequestService.retrieveManagerRequests(directReportIds, { status });
      }

      // eslint-disable-next-line max-len
      if (isRequester) requests = await RequestService.retrieveAllRequests({ user_id: userData.id, status });

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

      // eslint-disable-next-line max-len
      if (isRequester) request = await RequestService.retrieveOneRequest({ user_id: userData.id, id });

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
      const { user_id: userId } = await RequestRepository.findById(id);

      if (directReportIds.length === 0 || !userId || !directReportIds.includes(userId)) {
        response = new Response(res, 404, 'No request found');
        return response.sendErrorMessage();
      }

      const request = await RequestService.approveRequest(id);
      response = new Response(res, 200, 'Request is sucessfully approved', request[1]);
      return response.sendSuccessResponse();
    } catch (error) {
      return DbErrorHandler.handleSignupError(res, error);
    }
  }
}

export default RequestController;
