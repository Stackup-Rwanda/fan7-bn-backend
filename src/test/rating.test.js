import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';

require('../services/0auth');

chai.use(chaiHttp);
const { request } = chai;

it('You can\'t rate accommodation without providing rate star(s)', (done) => {
  request(server)
    .post('/api/accommodations/1/rate')
    .set({
      token:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiZW1haWwiOiJlbHZpc0BnbWFpbC5jb20iLCJyb2xlIjoicmVxdWVzdGVyIiwiaWF0IjoxNTgyMTAyODAwfQ.4CMBBAMrmAAxbXGuD8aXoCS1jWx08qUmcJF17q5Xg9g'
    })
    .end((error, response) => {
      expect(response).to.have.status(400);
      expect(response.body).to.be.a('object');
      expect(response.body.status).to.be.equal(400);
      done(error);
    });
});

it('You can\'t rate accommodation you didn\'t stay in', (done) => {
  request(server)
    .post('/api/accommodations/2/rate')
    .set({
      token:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiZW1haWwiOiJlbHZpc0BnbWFpbC5jb20iLCJyb2xlIjoicmVxdWVzdGVyIiwiaWF0IjoxNTgyMTAyODAwfQ.4CMBBAMrmAAxbXGuD8aXoCS1jWx08qUmcJF17q5Xg9g'
    })
    .send({
      rating: 3
    })
    .end((error, response) => {
      expect(response).to.have.status(401);
      expect(response.body).to.be.a('object');
      expect(response.body.status).to.be.equal(401);
      done(error);
    });
});

it('User should be able to rate accommodation he stayed in', (done) => {
  request(server)
    .post('/api/accommodations/1/rate')
    .set({
      token:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiZW1haWwiOiJlbHZpc0BnbWFpbC5jb20iLCJyb2xlIjoicmVxdWVzdGVyIiwiaWF0IjoxNTgyMTAyODAwfQ.4CMBBAMrmAAxbXGuD8aXoCS1jWx08qUmcJF17q5Xg9g'
    })
    .send({
      rating: 3
    })
    .end((error, response) => {
      expect(response).to.have.status(201);
      expect(response.body).to.be.a('object');
      expect(response.body.status).to.be.equal(201);
      done(error);
    });
});
