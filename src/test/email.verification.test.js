import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';

chai.use(chaiHttp);
const { request } = chai;

let token1;

before('Signup', (done) => {
  request(server)
    .post('/api/auth/signup')
    .set('Accept', 'application/json')
    .send({
      firstName: 'skemc',
      lastName: 'kare',
      userName: 'eric',
      password: 'Ericeric1',
      email: 'eric.mico6@gmail.com'
    })
    .end((err, res) => {
      if (err) {
        return done(err);
      }
      const { token } = res.body.data;
      token1 = token;
      return done();
    });
});

it('User should exist in the database before confirming', (done) => {
  request(server)
    .post('/api/auth/confirmation/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzaGFyb251YXNlQGdtYWlsLmNvbSIsImlhdCI6MTU4MDQwNjM0M30.8rC9m7J1E0BJd7NEdlW9rMIBbD6TkDZxiEaVo3iZV8Q')
    .set('Accept', 'application/json')
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

it('User should be able to verify his account', (done) => {
  request(server)
    .post(`/api/auth/confirmation/${token1}`)
    .set('Accept', 'application/json')
    .end((err, res) => {
      if (err) {
        return done(err);
      }
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.a.property('message');
      return done();
    });
});

it('User should can not verify his account twice', (done) => {
  request(server)
    .post(`/api/auth/confirmation/${token1}`)
    .set('Accept', 'application/json')
    .end((err, res) => {
      if (err) {
        return done(err);
      }
      expect(res).to.have.status(409);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.a.property('error');
      return done();
    });
});
