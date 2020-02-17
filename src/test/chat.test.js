import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import server from '../server';
import chat from '../controllers/ChatController';

chai.use(chaiHttp);
const { request } = chai;

it('User should send/get messages if he is logged in', (done) => {
  request(server)
    .get('/api/chat/?token=Bearer%20eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJmYW50YXN0aWM3QGdtYWlsLmNvbSIsImlhdCI6MTU4MTU4NDA2Mn0.8-e_KrY0y8aLe6ULHFrPumkqgHM30tO_dvxrKqTetRw')
    .end((err, res) => {
      if (err) {
        done(err);
      }
      expect(res.status).to.eql(200);
      done();
    });
});

it('Should drop error if token is invalid', (done) => {
  request(server)
    .get('/api/chat/?token=U4NDE1OH0')
    .end((err, res) => {
      if (err) {
        done(err);
      }
      expect(res.status).to.eql(400);
      done();
    });
});


it('Should not save message on Server Error', async () => {
  const req = {
    sender() {},
    message() {},
    error() {}
  };
  const res = {};
  sinon.stub(req, 'sender').returnsThis();
  sinon.stub(req, 'message').returnsThis();
  sinon.stub(req, 'error').returnsThis();
  chat.saveMessage(req, res);
  chat.getMessages(req, res);
});
