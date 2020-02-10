import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';

chai.use(chaiHttp);
const { request } = chai;

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJtdWhpcmVib3JpQHlhaG9vLmZyIiwiaWF0IjoxNTgwOTU2ODgyfQ.Z75OGHWY7AePt0HnbrYSR48GBMHJs8IFyuwBYGAfKps';

it('should return all found records about the search', (done) => {
  const key = 'lagos';
  request(server)
    .get(`/api/requests/search?keyword=${key}`)
    .set('Accept', 'application/json')
    .set('token', `Bearer ${token}`)
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

it('should return an error when no record was found from the search', (done) => {
  const keyword = 'kigalicious';
  request(server)
    .get(`/api/requests/search?keyword=${keyword}`)
    .set('Accept', 'application/json')
    .set('token', `Bearer ${token}`)
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
