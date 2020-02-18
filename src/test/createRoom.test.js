import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';

chai.use(chaiHttp);
const { request } = chai;

let token1;
let token2;
const token3 = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJtdWhpcmVib3JpQHlhaG9vLmZyIiwiaWF0IjoxNTgwOTU2ODgyfQ.Z75OGHWY7AePt0HnbrYSR48GBMHJs8IFyuwBYGAfKps';
const user = {
  email: 'mutesisharon@hotmail.com',
  password: 'Kemmy123'
};

const user1 = {
  email: 'mutesishazam@hotmail.com',
  password: 'Kemmy123'
};

describe('Accommodations Rooms', () => {
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

  it('Should add a room', done => {
    request(server)
      .post('/api/accommodations/3/room')
      .set('Accept', 'application/json')
      .set('token', `Bearer ${token1}`)
      .field('area', '3')
      .field('roomNumber', '3969')
      .field('amenities', 'Sharon')
      .field('amenities', 'Sharon')
      .field('cost', '67.4')
      .field('totalBedrooms', '3')
      .field('type', 'standard')
      .attach('image', 'src/test/assets/image.png', 'image.png')
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res).to.have.status(201);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.a.property('data');
        return done();
      });
  });

  it('Should return invalid inputs on create room', done => {
    request(server)
      .post('/api/accommodations/3/room')
      .set('Accept', 'application/json')
      .set('token', `Bearer ${token1}`)
      .field('area', '3')
      .field('roomNumber', '39696')
      .field('amenities', 'Sharon')
      .field('amenities', 'Sharon')
      .field('cost', '67.4')
      .field('totalBedrooms', '3')
      .field('type', 'standard')
      .attach('image', 'src/test/assets/image.png', 'image.png')
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

  it('Should return error of not host-supplier on create room', done => {
    request(server)
      .post('/api/accommodations/3/room')
      .set('Accept', 'application/json')
      .set('token', `Bearer ${token3}`)
      .field('area', '3')
      .field('roomNumber', '3969')
      .field('amenities', 'Sharon')
      .field('amenities', 'Sharon')
      .field('cost', '67.4')
      .field('totalBedrooms', '3')
      .field('type', 'standard')
      .attach('image', 'src/test/assets/image.png', 'image.png')
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res).to.have.status(401);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.a.property('error');
        return done();
      });
  });

  it('Should return error of accommodation not found on create room', done => {
    request(server)
      .post('/api/accommodations/67/room')
      .set('Accept', 'application/json')
      .set('token', `Bearer ${token1}`)
      .field('area', '3')
      .field('roomNumber', '3969')
      .field('amenities', 'Sharon')
      .field('amenities', 'Sharon')
      .field('cost', '67.4')
      .field('totalBedrooms', '3')
      .field('type', 'standard')
      .attach('image', 'src/test/assets/image.png', 'image.png')
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

  it('Should return error about not your accommodation on create room', done => {
    request(server)
      .post('/api/accommodations/1/room')
      .set('Accept', 'application/json')
      .set('token', `Bearer ${token2}`)
      .field('area', '3')
      .field('roomNumber', '3969')
      .field('amenities', 'Sharon')
      .field('amenities', 'Sharon')
      .field('cost', '67.4')
      .field('totalBedrooms', '3')
      .field('type', 'standard')
      .attach('image', 'src/test/assets/image.png', 'image.png')
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res).to.have.status(401);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.a.property('error');
        return done();
      });
  });

  it('Should return error about not Approved accommodation on create room', done => {
    request(server)
      .post('/api/accommodations/4/room')
      .set('Accept', 'application/json')
      .set('token', `Bearer ${token1}`)
      .field('area', '3')
      .field('cost', '67.4')
      .field('totalBedrooms', '3')
      .field('roomNumber', '3969')
      .field('amenities', 'Sharon')
      .field('amenities', 'Sharon')
      .field('type', 'standard')
      .attach('image', 'src/test/assets/image.png', 'image.png')
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res).to.have.status(405);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.a.property('error');
        return done();
      });
  });

  it('Should return error about room number exist already on create room', done => {
    request(server)
      .post('/api/accommodations/3/room')
      .set('Accept', 'application/json')
      .set('token', `Bearer ${token1}`)
      .field('area', '3')
      .field('cost', '67.4')
      .field('totalBedrooms', '3')
      .field('roomNumber', '3969')
      .field('amenities', 'Sharon')
      .field('amenities', 'Sharon')
      .field('type', 'standard')
      .attach('image', 'src/test/assets/image.png', 'image.png')
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res).to.have.status(409);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.a.property('error');
        return done();
      });
  });

  it('Should return error about room number exist already on create room', done => {
    request(server)
      .post('/api/accommodations/3/room')
      .set('Accept', 'application/json')
      .set('token', `Bearer ${token1}`)
      .field('area', '3')
      .field('cost', '67.46')
      .field('totalBedrooms', '3')
      .field('roomNumber', '3978')
      .field('amenities', 'Sharon')
      .field('amenities', 'Sharon')
      .field('type', 'standard')
      .attach('image', 'src/test/assets/invalid.pdf', 'invalid.pdf')
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res).to.have.status(415);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.a.property('error');
        return done();
      });
  });
});
