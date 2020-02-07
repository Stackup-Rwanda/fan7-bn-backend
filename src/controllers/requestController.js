
/* eslint-disable class-methods-use-this */
import models from '../models';
import { onError, onSuccess } from '../utils/response';

const { Request, User } = models;

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
}

export default RequestController;
