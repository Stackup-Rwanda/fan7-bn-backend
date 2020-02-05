/* eslint-disable class-methods-use-this */
import model from '../models';
import { onError, onSuccess } from '../utils/response';
import UserSchema from '../modules/userSchema';

const { Request } = model;

class TripRequestInfo {
  async oneWay(req, res, next) {
    try {
      const { error } = UserSchema.tripRequest(req.body);
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
        from: req.body.from,
        to: req.body.to,
        travelTime: req.body.travelTime,
        reason: req.body.reason,
        accomodation: req.body.accommodation
      };
      const { dataValues } = await Request.create(info);
      if (dataValues) onSuccess(res, 201, 'Your request has sent successfully, wait for approval');
      return next();
    } catch (ex) {
      onError(res, 500, 'Internal Server Error');
    }
  }
}
export default new TripRequestInfo();
