import server from './server.test';
import register from './register.test';
import login from './login.test';
import logout from './logout.test';
import dbErrorHandler from './dbErrorHandler.test';
import assignRole from './assignRole.test';

describe('API test', () => {
  describe('Server test', server);
  describe('Register test', register);
  describe('Login test', login);
  describe('logout test', logout);
  describe('DbErrorHandler Test', dbErrorHandler);
  describe('Register test', assignRole);
});
