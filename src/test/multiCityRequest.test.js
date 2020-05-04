import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';

chai.use(chaiHttp);
const { request } = chai;

it('Should successfully send a multi city request', done => {
  request(server)
    .post('/api/requests/multi_city')
    .set('Accept', 'application/json')
    .set(
      'token',
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJtdWhpcmVib3JpQHlhaG9vLmZyIiwiaWF0IjoxNTgwOTU2ODgyfQ.Z75OGHWY7AePt0HnbrYSR48GBMHJs8IFyuwBYGAfKps'
    )
    .send({
      origin: 'nigeria, lagos',
      destination: ['kenya, nairobi'],
      travelDates: ['2021-10-01'],
      reason: 'business',
      returnDate: '2022-11-01',
      passportName: 'bihire jules boris',
      passportNumber: '896723'
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

it('Should send an error about travelDates length not eqaul to destination length', done => {
  request(server)
    .post('/api/requests/multi_city')
    .set('Accept', 'application/json')
    .set(
      'token',
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJtdWhpcmVib3JpQHlhaG9vLmZyIiwiaWF0IjoxNTgwOTU2ODgyfQ.Z75OGHWY7AePt0HnbrYSR48GBMHJs8IFyuwBYGAfKps'
    )
    .send({
      origin: 'nigeria, lagos',
      destination: ['kenya, nairobi'],
      travelDates: ['2021-10-01', '2021-10-01'],
      reason: 'business',
      returnDate: '2022-11-01',
      passportName: 'bihire jules boris',
      passportNumber: '896723'
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

it('Should return error about multi city inputs', done => {
  request(server)
    .post('/api/requests/one_way')
    .set('Accept', 'application/json')
    .set(
      'token',
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJtdWhpcmVib3JpQHlhaG9vLmZyIiwiaWF0IjoxNTgwOTU2ODgyfQ.Z75OGHWY7AePt0HnbrYSR48GBMHJs8IFyuwBYGAfKps'
    )
    .send({
      origin: 'nigeria',
      destination: ['kenya, nairobi'],
      travelDates: ['2022-11-05'],
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
