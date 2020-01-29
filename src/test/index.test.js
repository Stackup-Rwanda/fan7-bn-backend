import server from './server.test';
import register from './register.test';
import login from './login.test';

describe('API test', () => {
  describe('Server test', server);
  describe('Register test', register);
  describe('Login test', login);
});
