
import EventEmitter from 'events';
import NotificationService from '../services/notification.service';

const eventEmitter = new EventEmitter();

export default () => {
  eventEmitter.on('approve_request', NotificationService.sendNotification);
};
