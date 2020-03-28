import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';

chai.use(chaiHttp);
const { request } = chai;

it('Should successfully send a request', done => {
  request(server)
    .post('/api/requests/one_way')
    .set('Accept', 'application/json')
    .set(
      'token',
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJtdWhpcmVib3JpQHlhaG9vLmZyIiwiaWF0IjoxNTgwOTU2ODgyfQ.Z75OGHWY7AePt0HnbrYSR48GBMHJs8IFyuwBYGAfKps'
    )
    .send({
      origin: 'nigeria, lagos',
      destination: 'rwanda, kigali',
      travelDate: '2020-10-01',
      reason: 'business',
      accommodationId: 1,
      passportName: 'bihire jules boris',
      passportNumber: '896723',
      rememberMe: true
    })
    .end((err, res) => {
      if (err) {
        return done(err);
      }
      expect(res).to.have.status(201);
      expect(res.body).to.be.an('object');
      expect(res.body.status).to.be.equal(201);
      return done();
    });
});

it('Should return error about inputs', done => {
  request(server)
    .post('/api/requests/one_way')
    .set('Accept', 'application/json')
    .set(
      'token',
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJtdWhpcmVib3JpQHlhaG9vLmZyIiwiaWF0IjoxNTgwOTU2ODgyfQ.Z75OGHWY7AePt0HnbrYSR48GBMHJs8IFyuwBYGAfKps'
    )
    .send({
      origin: 'nigeria',
      destination: 2,
      accommodationId: 1,
      travelDate: '2020-10-01',
      reason: 'business'
    })
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
