import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';

chai.use(chaiHttp);
const { request } = chai;

let token1;
const user = {
  password: 'Kemmy123',
  email: 'elvis@gmail.com'
};

describe('User provide feedback', () => {
  before((done) => {
    request(server)
      .post('/api/auth/login')
      .set('Accept', 'application/json')
      .send(user)
      .end(async (err, res) => {
        const { token } = res.body.data;
        token1 = token;
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

  it('Users should not be able to provide feedback on accommodation he didn\'t checked in', (done) => {
    request(server)
      .post('/api/accommodations/5/feedback')
      .set('Accept', 'application/json')
      .set('token', `Bearer ${token1}`)
      .send({ feedback: 'Improve wifi' })
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
});
