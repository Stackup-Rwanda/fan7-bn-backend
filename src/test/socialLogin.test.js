import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import server from '../server';
import auth from '../middlewares/emailAuth';
import { onError, onSuccess } from '../utils/response';

require('../services/0auth');

chai.use(chaiHttp);
const { request } = chai;

it('User should be redirected to facebook', (done) => {
  request(server)
    .get('/api/auth/facebook')
    .end((err, res) => {
      if (err) {
        done(err);
      }
      expect(res.redirects[0]).to.contain(
        'https://www.facebook.com/v3.2/dialog/oauth?response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A5000%2Fapi%2Fauth%2Ffacebook%2Fcallback&client_id=3274146169280654'
      );
      done();
    });
});

it('User should be redirected to google', (done) => {
  request(server)
    .get('/api/auth/google')
    .end((err, res) => {
      if (err) {
        done(err);
      }
      expect(res.redirects[0]).to.contain(
        'https://accounts.google.com/o/oauth2/v2/auth?response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A5000%2Fapi%2Fauth%2Fgoogle%2Fcallback&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email&client_id=598281568439-8hdbb10onlijn5uc9k0bngi2ucg37cop.apps.googleusercontent.com'
      );
      done();
    });
});
it('Catch errors while google redirect', async () => {
  const err = {};
  const next = () => {};
  const req = {};
  const res = {
    status() {},
    json() {},
    redirect() {}
  };
  sinon.stub(res, 'status').returnsThis();
  sinon.stub(res, 'redirect').returnsThis();
  await auth.googleTokenChecker(err, req, res, next);
});

it('Catch errors while facebook redirect to the App', async () => {
  const err = {};
  const next = () => {};
  const req = {};
  const res = {
    status() {},
    json() {},
    redirect() {}
  };
  sinon.stub(res, 'status').returnsThis();
  sinon.stub(res, 'redirect').returnsThis();
  await auth.facebookTokenChecker(err, req, res, next);
});

it('Send error response on failure', async () => {
  const err = {};
  const code = {};
  const res = {
    status() {},
    json() {},
  };
  sinon.stub(res, 'status').returnsThis();
  sinon.stub(res, 'json').returnsThis();
  onError(res, code, err);
});

it('Send success response on success', async () => {
  const message = {};
  const code = {};
  const data = {};
  const res = {
    status() {},
    json() {},
  };
  sinon.stub(res, 'status').returnsThis();
  sinon.stub(res, 'json').returnsThis();
  onSuccess(res, code, message, data);
});
