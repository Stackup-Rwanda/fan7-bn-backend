import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';

chai.use(chaiHttp);
const { request } = chai;

it('Should successfully send a successful return request', done => {
  request(server)
    .post('/api/requests/return_trip')
    .set('Accept', 'application/json')
    .set(
      'token',
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJtdWhpcmVib3JpQHlhaG9vLmZyIiwiaWF0IjoxNTgwOTU2ODgyfQ.Z75OGHWY7AePt0HnbrYSR48GBMHJs8IFyuwBYGAfKps'
    )
    .send({
      origin: 'rwanda, kigali',
      destination: 'burundi, bujumbura',
      travelDate: '2020-10-01',
      returnDate: '2020-11-01',
      reason: 'business',
      accommodationId: 2,
      user_id: 1,
      dob: '2020-10-23',
      passportName: 'bihire jules boris',
      passportNumber: 232450,
      gender: 'Male',
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

it('Should return an error about no returnDate', done => {
  request(server)
    .post('/api/requests/return_trip')
    .set('Accept', 'application/json')
    .set(
      'token',
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJtdWhpcmVib3JpQHlhaG9vLmZyIiwiaWF0IjoxNTgwOTU2ODgyfQ.Z75OGHWY7AePt0HnbrYSR48GBMHJs8IFyuwBYGAfKps'
    )
    .send({
      origin: 'rwanda, kigali',
      destination: 'burundi, bujumbura',
      travelDate: '2020-10-01',
      reason: 'business',
      accommodationId: 2,
      user_id: 1,
      dob: '2020-10-23',
      passportName: 'bihire jules boris',
      passportNumber: 232450,
      gender: 'Male',
      rememberMe: true
    })
    .end((err, res) => {
      if (err) {
        return done(err);
      }
      expect(res).to.have.status(422);
      expect(res.body).to.be.an('object');
      expect(res.body.status).to.be.equal(422);
      return done();
    });
});

it('Should return error about inputs', done => {
  request(server)
    .post('/api/requests/return_trip')
    .set('Accept', 'application/json')
    .set(
      'token',
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJtdWhpcmVib3JpQHlhaG9vLmZyIiwiaWF0IjoxNTgwOTU2ODgyfQ.Z75OGHWY7AePt0HnbrYSR48GBMHJs8IFyuwBYGAfKps'
    )
    .send({
      origin: 'rwanda',
      destination: 'burundi, bujumbura',
      travelDate: '2020-10-01',
      returnDate: '2020-11-01',
      reason: 'business',
      accommodationId: 2
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
