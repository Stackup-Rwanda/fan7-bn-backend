import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';

chai.use(chaiHttp);
const { request } = chai;
const logoutUrl = '/api/auth/logout';
const testLogoutUrl = '/api/auth/testlogout';
let token2;
const token1 = 'bjjkassduyrr7634ty73yqegjhdkjsvjvdsjva';

before((done) => {
  request(server)
    .post('/api/auth/signup')
    .set('Accept', 'application/json')
    .send({
      firstName: 'Mutesi',
      lastName: 'Sharon',
      userName: 'Tesi',
      password: 'Fantastic7',
      email: 'tesi1@admin.com'
    })
    .end((err, res) => {
      const { token } = res.body.data;
      token2 = token;
      done();
    });
});
it('should  access resources while logged in', (done) => {
  request(server)
    .get(testLogoutUrl)
    .set('Accept', 'application/json')
    .set('token', `Bearer ${token2}`)
    .end((err, res) => {
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('message');
      expect(res.body.status).to.eq(200);
      expect(res.body.message).to.eq('Still Loggedin');
      done();
    });
});
it('should logout a logged in user', (done) => {
  request(server)
    .get(logoutUrl)
    .set('Accept', 'application/json')
    .set('token', `Bearer ${token2}`)
    .end((err, res) => {
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('message');
      expect(res.body.status).to.eq(200);
      expect(res.body.message).to.eq('You have logged out');
      done();
    });
});
it('should return an error if token is not provided', (done) => {
  request(server)
    .get(logoutUrl)
    .set('Accept', 'application/json')
    .end((err, res) => {
      expect(res.status).to.equal(403);
      expect(res.body).to.have.property('error');
      expect(res.body.status).to.eq(403);
      expect(res.body.error).to.eq('provide token!');
      done();
    });
});
it('should  not access resources while logged out', (done) => {
  request(server)
    .get(testLogoutUrl)
    .set('Accept', 'application/json')
    .set('token', `Bearer ${token2}`)
    .end((err, res) => {
      expect(res.status).to.equal(401);
      expect(res.body).to.have.property('error');
      expect(res.body.status).to.eq(401);
      expect(res.body.error).to.eq('Please login required');
      done();
    });
});
it('should  an error for an invalid token', (done) => {
  request(server)
    .get(testLogoutUrl)
    .set('Accept', 'application/json')
    .set('token', `Bearer ${token1}`)
    .end((err, res) => {
      expect(res.status).to.equal(400);
      expect(res.body).to.have.property('error');
      expect(res.body.status).to.eq(400);
      expect(res.body.error).to.eq('invalid token');
      done();
    });
});
