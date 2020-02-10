/* eslint-disable import/no-cycle */
import EventEmitter from 'events';
import NotificationService from '../services/notification.service';

export const eventEmitter = new EventEmitter();

export default () => {
  eventEmitter.on('notification', NotificationService.send);
};
