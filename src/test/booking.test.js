import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';

chai.use(chaiHttp);
const { request } = chai;

let token1;
let token2;
const user = {
  email: 'fantastic5@gmail.com',
  password: 'Kemmy123'
};
const user1 = {
  email: 'elvisrugamba@gmail.com',
  password: 'Kemmy123'
};

describe('Booking a room tests', () => {
  before(done => {
    request(server)
      .post('/api/auth/login')
      .set('Accept', 'application/json')
      .send(user)
      .end(async (err, res) => {
        const { token } = res.body.data;
        token1 = token;
        done();
      });
  });

  before(done => {
    request(server)
      .post('/api/auth/login')
      .set('Accept', 'application/json')
      .send(user1)
      .end(async (err, res) => {
        const { token } = res.body.data;
        token2 = token;
        done();
      });
  });

  it('Should successfully booked a room', done => {
    request(server)
      .post('/api/accommodations/1/book/3')
      .set('Accept', 'application/json')
      .set(
        'token',
        `Bearer ${token1}`
      )
      .send({
        trip_id: 1,
        checkin: '2020-06-09',
        checkout: '2020-08-06'
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

  it('Should return error about book inputs', done => {
    request(server)
      .post('/api/accommodations/1/book/3')
      .set('Accept', 'application/json')
      .set(
        'token',
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJtdWhpcmVib3JpQHlhaG9vLmZyIiwiaWF0IjoxNTgwOTU2ODgyfQ.Z75OGHWY7AePt0HnbrYSR48GBMHJs8IFyuwBYGAfKps'
      )
      .send({
        trip_id: 1,
        checkin: '2017-06-09',
        checkout: '2020-08-06'
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

  it('Should get all bookings', (done) => {
    request(server)
      .get('/api/bookings/')
      .set('Accept', 'application/json')
      .set('token', `Bearer ${token1}`)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.a.property('data');
        return done();
      });
  });

  it('Should get a specific booking', (done) => {
    request(server)
      .get('/api/bookings/6')
      .set('Accept', 'application/json')
      .set('token', `Bearer ${token1}`)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.a.property('data');
        return done();
      });
  });

  it('Should not get all bookings if not found', (done) => {
    request(server)
      .get('/api/bookings/')
      .set('Accept', 'application/json')
      .set('token', `Bearer ${token2}`)
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

  it('Should not get a specific booking if not found', (done) => {
    request(server)
      .get('/api/bookings/100')
      .set('Accept', 'application/json')
      .set('token', `Bearer ${token1}`)
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
});
