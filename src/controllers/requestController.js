/* eslint-disable class-methods-use-this */
import model from '../models';
import { onError, onSuccess } from '../utils/response';
import requestSchema from '../modules/requestSchema';

const { Request } = model;

class TripRequestInfo {
  async oneWay(req, res, next) {
    try {
      const { error } = requestSchema.destinationSchema(req.body);
      if (error) {
        const errMsg = error.details[0].message.split('"').join('');
        return onError(res, 400, errMsg);
      }
      const info = {
        userId: req.userData.id,
        passportName: req.body.passportName,
        passportNumber: req.body.passportNumber,
        gender: req.body.gender,
        role: req.body.role,
        dob: req.body.dob,
        origin: req.body.origin,
        destination: req.body.destination,
        travelDate: req.body.travelDate,
        reason: req.body.reason,
        accommodation_id: req.body.accommodation_id
      };
      await Request.create(info);
      onSuccess(res, 201, 'Your request has sent successfully, wait for approval');
      return next();
    } catch (ex) {
      onError(res, 500, 'Internal Server Error');
    }
  }
}
export default new TripRequestInfo();
