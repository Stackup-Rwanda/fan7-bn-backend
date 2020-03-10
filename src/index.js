import authentication from './routes/authentication';
import profile from './routes/profile.route';
import notification from './routes/notification.route';
import Comment from './routes/comment.route';
import requests from './routes/requests';
import request from './routes/request.route';
import accommodation from './routes/accommodation.route';
import Feeback from './routes/feedback.route';
import chat from './routes/chat';
import Rating from './routes/rating.route';
import user from './routes/user.route';
import booking from './routes/booking.route';

export default (app) => {
  app.use('/api/auth', authentication);
  app.use('/api/profile', profile);
  app.use('/api/notifications', notification);
  app.use('/api/requests', requests);
  app.use('/api/requests', request);
  app.use('/api/requests', Comment);
  app.use('/api/accommodations', accommodation);
  app.use('/api/accommodations', Feeback);
  app.use('/api/chat', chat);
  app.use('/api/accommodations', Rating);
  app.use('/api/users', user);
  app.use('/api/bookings', booking);

  app.use((req, res, next) => {
    const err = new Error('Page not found');
    err.status = 404;
    next(err);
  });

  // eslint-disable-next-line no-unused-vars
  app.use((error, req, res, next) => {
    const status = error.status || 500;
    res.status(status);
    res.json({
      status,
      error: error.message,
    });
  });
};
