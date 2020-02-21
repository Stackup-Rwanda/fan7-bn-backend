import RequestRepository from '../repositories/requestRepository';
import userRepository from '../repositories/userRepository';

export default async (eventType, requestId, role) => {
  let notification = {};
  let receiver;
  const { user } = await RequestRepository.findById(requestId);
  let lineManager;

  if (eventType === 'created_request' || eventType === 'edited_request') {
    lineManager = await userRepository.findByEmail(user.line_manager);
    receiver = lineManager;
  } else if (eventType === 'commented_request') {
    if (role === 'manager') {
      receiver = user;
    } else {
      lineManager = await userRepository.findByEmail(user.line_manager);
      receiver = lineManager;
    }
  } else {
    receiver = user;
  }

  switch (eventType) {
    case 'created_request':
      notification = {
        user_id: lineManager.id,
        request_id: requestId,
        type: 'Created',
        message: 'New request has been created, waiting for approval',
        link: `api/requests/${requestId}`
      };
      break;
    case 'edited_request':
      notification = {
        user_id: lineManager.id,
        request_id: requestId,
        type: 'Updated',
        message: 'Request has been updated',
        link: `api/requests/${requestId}`
      };
      break;
    case 'approved_request':
      notification = {
        user_id: user.id,
        request_id: requestId,
        type: 'Approved',
        message: 'Your request has been approved',
        link: `api/requests/${requestId}`
      };
      break;
    case 'rejected_request':
      notification = {
        user_id: user.id,
        request_id: requestId,
        type: 'Rejected',
        message: 'Your request has been rejected',
        link: `api/requests/${requestId}`
      };
      break;
    case 'commented_request':
      notification = {
        user_id: user.id,
        request_id: requestId,
        type: 'Commented',
        message: 'Request has been commented on',
        link: `api/requests/${requestId}/comment`
      };
      break;
    default:
      break;
  }

  return { notification, receiver };
};
