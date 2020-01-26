import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';

chai.use(chaiHttp);
const { request } = chai;

it('Should return a token', (done) => {
  request(server)
    .post('/auth/signup')
    .set('Accept', 'application/json')
    .send({
      firstName: 'bihire',
      lastName: 'boris',
      userName: 'bobo',
      password: 'bobo',
      role: 'superadmin',
      email: 'mhj@admin.com'
    })
    .end((err, res) => {
      if (err) {
        return done(err);
      }
      expect(res.status).to.eql(201);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.a.property('data');
      return done();
    });
});

it('Should return a error email exist already', (done) => {
  request(server)
    .post('/auth/signup')
    .set('Accept', 'application/json')
    .send({
      firstName: 'bihire',
      lastName: 'boris',
      userName: 'bobo',
      password: 'bobo',
      role: 'superadmin',
      email: 'mhj@admin.com'
    })
    .end((err, res) => {
      if (err) {
        return done(err);
      }
      expect(res.status).to.eql(400);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.a.property('error');
      return done();
    });
});
