import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';

chai.use(chaiHttp);
const router = () => chai.request(app);
const data = [
  {},
  { comment: 'This is the test comment that meet criteria' }
];
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsImVtYWlsIjoiUndhbmRhMjUwQGdtYWlsLmNvbSIsImlhdCI6MTU4MTA2MDUxNH0.FRn2TdTfIieeoM4MDFAMsbimUT223_dH-hRXgy2Pvjw';

describe('Barefoot Nomad Comment Testing suite', () => {
  it('all users should not be able to comment when comment field is empty', (done) => {
    router()
      .post('/api/requests/1/comment')
      .set('Accept', 'application/json')
      .set('token', `Bearer ${token}`)
      .send(data[0])
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.a.property('error');
        return done();
      });
  });
  it('all users should not be able to comment when comment field is  10 min characters', (done) => {
    router()
      .post('/api/requests/1/comment')
      .set('Accept', 'application/json')
      .set('token', `Bearer ${token}`)
      .field('comment', 'this is a')
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.a.property('error');
        return done();
      });
  });
  it('all users should not be able to comment when comment field is not string', (done) => {
    router()
      .post('/api/requests/1/comment')
      .set('Accept', 'application/json')
      .set('token', `Bearer ${token}`)
      .field('comment', '1234567890987654')
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.a.property('error');
        return done();
      });
  });
  it('all users should be able to add a comment', (done) => {
    router()
      .post('/api/requests/1/comment')
      .set('Accept', 'application/json')
      .set('token', `Bearer ${token}`)
      .send(data[1])
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res).to.have.status(201);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.a.property('message');
        return done();
      });
  });
  it('all users should be able to retrive all the comments of a certain request', (done) => {
    router()
      .get('/api/requests/1/comments')
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
  it('all users should not be able delete a comment with Invalid ID', (done) => {
    router()
      .get('/api/requests/comment/12345678')
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
  it('all users should be successful delete the comment', (done) => {
    router()
      .delete('/api/requests/comment/1')
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
});
