import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';
import cont from '../controllers/requestController';

require('../services/0auth');

chai.use(chaiHttp);
const { request } = chai;

it('Registered user should be able to request a trip', (done) => {
  request(server)
    .post('/api/requests/one_way')
    .set({ token: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuYW1lQGV4YW1wbGUuY29tIiwiaWF0IjoxNTgwODkyNDM5fQ.xGAHCjyRKSGcsVHqiLGASfwGxmQHsNYRL_GY3uS34Ks' })
    .send({
      passportName: 'Boris Bihire',
      passportNumber: '198700650',
      gender: 'Female',
      role: 'requester',
      dob: '12/Nov/1673',
      origin: 'Kigali, Rwanda',
      destination: 'Nairobi, Kenya',
      travelDate: '2020-02-29',
      reason: 'lifeisshortjust chill',
      accommodation_id: 3,
      rememberMe: true
    })
    .end((error, response) => {
      expect(response).to.have.status(201);
      expect(response.body).to.be.a('object');
      expect(response.body.status).to.be.equal(201);
      done(error);
    });
});

it('User should not request if there is server error', () => {
  const res = {
    status() {},
    json() {}
  };
  const next = () => {};
  const req = {
    reasonable: 'lifeisshortjust chill',
  };
  cont.oneWay(req, res, next);
});


it('If he checked remember checkbox, App should be able to get his profile automatically  ', (done) => {
  request(server)
    .post('/api/requests/one_way')
    .set({ token: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuYW1lQGV4YW1wbGUuY29tIiwiaWF0IjoxNTgwODkyNDM5fQ.xGAHCjyRKSGcsVHqiLGASfwGxmQHsNYRL_GY3uS34Ks' })
    .send({
      origin: 'Kigali, Rwanda',
      destination: 'Nairobi, Kenya',
      travelDate: '2020-02-29',
      reason: 'lifeisshortjust chill',
      accommodation_id: 3,
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
      expect(response).to.have.status(400);
      expect(response.body).to.be.a('object');
      expect(response.body.status).to.be.equal(400);
      done(error);
    });
});
