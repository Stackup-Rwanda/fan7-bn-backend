import server from './server.test';
import register from './register.test';
import login from './login.test';
import logout from './logout.test';
import reset from './reset.test';
import dbErrorHandler from './dbErrorHandler.test';
import profile from './profile.test';
import verification from './email.verification.test';
import assignRole from './assignRole.test';
import socialLogin from './socialLogin.test';
import notification from './notification.test';
import autoFill from './autoFill.test';

describe('API test', () => {
  describe('Server test', server);
  describe('Register test', register);
  describe('Login test', login);
  describe('logout test', logout);
  describe('reset test', reset);
  describe('DbErrorHandler Test', dbErrorHandler);
  describe('Profile page Test', profile);
  describe('Email Verification test', verification);
  describe('Register test', assignRole);
  describe('Social Login test', socialLogin);
  describe('Notification test', notification);
  describe('Remember user information', autoFill);
});
