import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';

chai.use(chaiHttp);
chai.should();

let managerToken;
let requesterToken;

const manager = {
  email: 'elvisrugamba@gmail.com',
  password: 'Kemmy123'
};
const requester = {
  email: 'elvis@gmail.com',
  password: 'Kemmy123'
};

describe('Requests Test', () => {
  before((done) => {
    chai.request(server)
      .post('/api/auth/login')
      .set('Accept', 'application/json')
      .send(manager)
      .end(async (err, res) => {
        const { token } = res.body.data;
        managerToken = token;
        done();
      });
  });
  it('should be able to reject if line manager', done => {
    chai.request(server)
      .patch('/api/requests/9/reject')
      .set(
        'token',
        `Bearer ${managerToken}`,
      )
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('message', 'Request rejected successfully');
        done();
      });
  });

  it('should not be able to reject if request not found', done => {
    chai.request(server)
      .patch('/api/requests/3/reject')
      .set(
        'token',
        `Bearer ${managerToken}`,
      )
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have.property('error', 'Sorry, Request is not found in your report');
        done();
      });
  });
  it('should not be able to reject if already rejected', done => {
    chai.request(server)
      .patch('/api/requests/9/reject')
      .set(
        'token',
        `Bearer ${managerToken}`,
      )
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('error', 'Request is already rejected');
        done();
      });
  });
});

describe('User who is not manager', () => {
  before((done) => {
    chai.request(server)
      .post('/api/auth/login')
      .set('Accept', 'application/json')
      .send(requester)
      .end(async (err, res) => {
        const { token } = res.body.data;
        requesterToken = token;
        done();
      });
  });
  it('should not be able to reject if request not line manager', done => {
    chai.request(server)
      .patch('/api/requests/10/reject')
      .set(
        'token',
        `Bearer ${requesterToken}`,
      )
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.have.property('error', 'Unauthorized access');
        done();
      });
  });
});
