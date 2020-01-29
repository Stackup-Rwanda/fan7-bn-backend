import server from './server.test';
import register from './register.test';
import logout from './logout.test';
import reset from './reset.test';
import dbErrorHandler from './dbErrorHandler.test';

describe('API test', () => {
  describe('Server test', server);
  describe('Register test', register);
  describe('logout test', logout);
  describe('reset test', reset);
  describe('DbErrorHandler Test', dbErrorHandler);
});
