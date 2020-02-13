import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import UserRepository from '../repositories/userRepository';
import server from '../server';

chai.use(chaiHttp);
const { request } = chai;

let token1;
const user = {
  userName: 'Tesi',
  password: 'Fantastic7',
  email: 'e.kskemc@gmail.com'
};

before((done) => {
  request(server)
    .post('/api/auth/signup')
    .set('Accept', 'application/json')
    .send(user)
    .end(async (err, res) => {
      const { token } = res.body.data;
      token1 = token;
      await UserRepository.verify(user.email, { isVerified: true });
      done();
    });
});

it('Users should not be able to give a feedback when the feedback field is empty', (done) => {
  request(server)
    .post('/api/accommodations/1/feedback')
    .set('Accept', 'application/json')
    .set('token', `Bearer ${token1}`)
    .field('feedback', '')
    .end((err, res) => {
      if (err) {
        return done(err);
      }
      expect(res).to.have.status(400);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.a.property('error');
      return done();
    });
});

it('Users should not be able to give a feedback when the feedback field is  10 min characters', (done) => {
  request(server)
    .post('/api/accommodations/1/feedback')
    .set('Accept', 'application/json')
    .set('token', `Bearer ${token1}`)
    .field('feedback', 'feedback')
    .end((err, res) => {
      if (err) {
        return done(err);
      }
      expect(res).to.have.status(400);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.a.property('error');
      return done();
    });
});

it('Users should not be able to give a feedback when the feedback field is not string', (done) => {
  request(server)
    .post('/api/accommodations/1/feedback')
    .set('Accept', 'application/json')
    .set('token', `Bearer ${token1}`)
    .field('feedback', '078987654321')
    .end((err, res) => {
      if (err) {
        return done(err);
      }
      expect(res).to.have.status(400);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.a.property('error');
      return done();
    });
});

it('Users should be able to provide feedback', (done) => {
  request(server)
    .post('/api/accommodations/1/feedback')
    .set('Accept', 'application/json')
    .set('token', `Bearer ${token1}`)
    .send({ feedback: 'Improve wifi' })
    .end((err, res) => {
      if (err) {
        return done(err);
      }
      expect(res).to.have.status(201);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.a.property('message');

      return done();
    });
});
