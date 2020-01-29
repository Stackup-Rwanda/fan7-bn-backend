import server from './server.test';
import register from './register.test';
import dbErrorHandler from './dbErrorHandler.test';

describe('API test', () => {
  describe('Server test', server);
  describe('Register test', register);
  describe('DbErrorHandler Test', dbErrorHandler);
});
