import server from './server.test';
import register from './register.test';
import logout from './logout.test';


describe('API test', () => {
  describe('Server test', server);
  describe('Register test', register);
  describe('logout test', logout);
});
