import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';

require('../services/0auth');

chai.use(chaiHttp);
const { request } = chai;

it('To request a trip', (done) => {
  request(server)
    .post('/api/requests/one_way')
    .set({
      token:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJtdWhpcmVib3JpQHlhaG9vLmZyIiwiaWF0IjoxNTgwOTU2ODgyfQ.Z75OGHWY7AePt0HnbrYSR48GBMHJs8IFyuwBYGAfKps'
    })
    .send({
      origin: 'nigeria, lagos',
      destination: 'burundi, bujumbura',
      travelDate: '2020-11-02',
      reason: 'business',
      returnDate: '2021-10-03',
      dob: '2020-10-01',
      accommodationId: 1,
      passportName: 'bihire jules boris',
      passportNumber: '896723',
      gender: 'Male',
      rememberMe: true
    })
    .end((error, response) => {
      expect(response).to.have.status(201);
      expect(response.body).to.be.a('object');
      expect(response.body.status).to.be.equal(201);
      done(error);
    });
});


it('Should fill others', (done) => {
  request(server)
    .post('/api/requests/one_way')
    .set({
      token:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJtdWhpcmVib3JpQHlhaG9vLmZyIiwiaWF0IjoxNTgwOTU2ODgyfQ.Z75OGHWY7AePt0HnbrYSR48GBMHJs8IFyuwBYGAfKps'
    })
    .send({
      origin: 'nigeria, lagos',
      destination: 'burundi, bujumbura',
      travelDate: '2021-11-01',
      accommodationId: 1,
      reason: 'business',
      rememberMe: false
    })
    .end((error, response) => {
      expect(response).to.have.status(201);
      expect(response.body).to.be.a('object');
      expect(response.body.status).to.be.equal(201);
      done(error);
    });
});

it('You can\'t request trip when you don\'t provide full information ', (done) => {
  request(server)
    .post('/api/requests/one_way')
    .set({ token: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuYW1lQGV4YW1wbGUuY29tIiwiaWF0IjoxNTgwODkyNDM5fQ.xGAHCjyRKSGcsVHqiLGASfwGxmQHsNYRL_GY3uS34Ks' })
    .send({ origin: 'Kigali, Rwanda' })
    .end((error, response) => {
      expect(response).to.have.status(422);
      expect(response.body).to.be.a('object');
      expect(response.body.status).to.be.equal(422);
      done(error);
    });
});
