/* eslint-disable class-methods-use-this */
import model from '../models';
import { onError, onSuccess } from '../utils/response';

const { Request } = model;

class RequestController {
  async create(req, res, next) {
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
export default new RequestController();
