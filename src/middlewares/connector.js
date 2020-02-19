import socket from 'socket.io-client';
import userRepository from '../repositories/userRepository';
import { onError } from '../utils/response';

const connector = async (req, res, next) => {
  const io = socket.connect(`${req.protocol}://${req.headers.host}`, { secure: true, rejectUnauthorized: false });
  const user = await userRepository.findById(req.userData.id);
  if (!user) return onError(res, 401, 'User not found');
  io.emit('new-user', user.dataValues);
  next();
};
export default connector;
