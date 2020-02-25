import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';

chai.use(chaiHttp);
const { request } = chai;

let token1;
let token2;
const user = {
  password: 'Kemmy123',
  email: 'sharon@gmail.com'
};
const user1 = {
  password: 'Kemmy123',
  email: 'elvis@gmail.com'
};

describe('Users tests', () => {
  before((done) => {
    request(server)
      .post('/api/auth/login')
      .set('Accept', 'application/json')
      .send(user)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        const { token } = res.body.data;
        token1 = token;
        done();
      });
  });

  it('Should return all users', (done) => {
    request(server)
      .get('/api/users')
      .set('Accept', 'application/json')
      .set('token', `Bearer ${token1}`)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.a.property('data');
        return done();
      });
  });

  it('Should return a specific user', (done) => {
    request(server)
      .get('/api/users/8')
      .set('Accept', 'application/json')
      .set('token', `Bearer ${token1}`)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.a.property('data');
        return done();
      });
  });

  it('Should not return a specific user if not found', (done) => {
    request(server)
      .get('/api/users/100')
      .set('Accept', 'application/json')
      .set('token', `Bearer ${token1}`)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res).to.have.status(404);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.a.property('error');
        return done();
      });
  });

  it('Should not return a specific user for invalid id', (done) => {
    request(server)
      .get('/api/users/invalid')
      .set('Accept', 'application/json')
      .set('token', `Bearer ${token1}`)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res).to.have.status(422);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.a.property('error');
        return done();
      });
  });
});

describe('Users tests for non super admin', () => {
  before((done) => {
    request(server)
      .post('/api/auth/login')
      .set('Accept', 'application/json')
      .send(user1)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        const { token } = res.body.data;
        token2 = token;
        return done();
      });
  });

  it('Should not return all users if you are not a super admin', (done) => {
    chai.request(server)
      .get('/api/users')
      .set('Accept', 'application/json')
      .set('token', `Bearer ${token2}`)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res).to.have.status(403);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.a.property('error');
        return done();
      });
  });
});
