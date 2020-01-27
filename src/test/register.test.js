import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';

chai.use(chaiHttp);
const { request } = chai;

it('Should return a token', (done) => {
  request(server)
    .post('/api/auth/signup')
    .set('Accept', 'application/json')
    .send({
      firstName: 'bihire',
      lastName: 'boris',
      userName: 'bobo',
      password: 'Bobo12345',
      email: 'mhj@admin.com'
    })
    .end((err, res) => {
      if (err) {
        return done(err);
      }
      expect(res).to.have.status(201);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.a.property('data');
      return done();
    });
});

it('Should return a error email exist already', (done) => {
  request(server)
    .post('/api/auth/signup')
    .set('Accept', 'application/json')
    .send({
      firstName: 'bihire',
      lastName: 'boris',
      userName: 'bobo',
      password: 'Bobo12345',
      email: 'mhj@admin.com'
    })
    .end((err, res) => {
      if (err) {
        return done(err);
      }
      expect(res.status).to.eql(409);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.a.property('error');
      return done();
    });
});

it('Should return an error for invalid user parameters', (done) => {
  request(server)
    .post('/api/auth/signup')
    .set('Accept', 'application/json')
    .send({
      firstName: 'bihire',
      lastName: 'boris',
      userName: 'bobo',
      password: 'Bobo',
      email: 'mh@admin.com'
    })
    .end((err, res) => {
      if (err) {
        return done(err);
      }
      expect(res.status).to.eql(422);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.a.property('error');
      return done();
    });
});

it('Should validate using dbHandler', (done) => {
  request(server)
    .post('/api/auth/signup')
    .set('Accept', 'application/json')
    .send({
      firstName: 'bihire',
      lastName: 'boris',
      userName: 'bobo',
      password: 'Bobo',
      email: 'mh@admin.com'
    })
    .end((err, res) => {
      if (err) {
        return done(err);
      }
      expect(res.status).to.eql(422);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.a.property('error');
      return done();
    });
});
