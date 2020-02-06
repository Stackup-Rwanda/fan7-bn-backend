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
      expect(res.redirects[0]).to.contain('https://www.facebook.com/');
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
      expect(res.redirects[0]).to.contain('https://accounts.google.com/');
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
  await auth.googleTokenChecker(err, req, res, next);
  sinon.stub(res, 'status').returnsThis();
  sinon.stub(res, 'redirect').returnsThis();
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
  await auth.facebookTokenChecker(err, req, res, next);
  sinon.stub(res, 'status').returnsThis();
  sinon.stub(res, 'redirect').returnsThis();
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
