import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';

chai.use(chaiHttp);
const { request } = chai;

it('Server Should handle the unkown routes for GET request ', (done) => {
  request(server)
    .get('/others')
    .end((err, res) => {
      if (err) {
        return done(err);
      }
      expect(res.status).to.eql(404);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.a.property('error');
      return done();
    });
});

it('Server Should handle the unkown routes for POST request', (done) => {
  request(server)
    .post('/others')
    .send({ id: 3, name: 'Peter' })
    .end((err, res) => {
      if (err) {
        return done(err);
      }
      expect(res.status).to.eql(404);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.a.property('error');
      return done();
    });
});

it('Server Should handle the unkown routes for PATCH request ', (done) => {
  request(server)
    .patch('/others')
    .send({ id: 2, name: 'Paul' })
    .end((err, res) => {
      if (err) {
        return done(err);
      }
      expect(res.status).to.eql(404);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.a.property('error');
      return done();
    });
});

it('Server Should handle the unkown routes for DELETE request ', (done) => {
  request(server)
    .delete('/others')
    .send({ id: 2 })
    .end((err, res) => {
      if (err) {
        return done(err);
      }
      expect(res.status).to.eql(404);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.a.property('error');
      return done();
    });
});

it('Server should display homepage', (done) => {
  request(server)
    .get('/')
    .end((err, res) => {
      expect(res.status).to.eql(200);
      done();
    });
});

export default server;
