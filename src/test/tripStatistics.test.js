import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';

chai.use(chaiHttp);
const { request } = chai;

let token1;
const user = {
  password: 'Kemmy123',
  email: 'elvis@gmail.com'
};

const user2 = {
  password: 'Kemmy123',
  email: 'elvisrugamba@gmail.com'
};

describe('Traveler should get trip statistics', () => {
  before((done) => {
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

  it('Users should not be able to get statistics when the date field is invalid', (done) => {
    request(server)
      .get('/api/requests/statistics')
      .set('Accept', 'application/json')
      .set('token', `Bearer ${token1}`)
      .send({ startDate: 'twenty twenty', endDate: 'twenty nineteen' })
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

  it('Users should not be able to get statistics when no trips were made in the provided time frame', (done) => {
    request(server)
      .get('/api/requests/statistics')
      .set('Accept', 'application/json')
      .set('token', `Bearer ${token1}`)
      .send({ startDate: '2019-02-2', endDate: '2019-02-20' })
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

  it('Users should be able to get statistics when trips were made in the provided time frame', (done) => {
    request(server)
      .get('/api/requests/statistics')
      .set('Accept', 'application/json')
      .set('token', `Bearer ${token1}`)
      .send({ startDate: '2020-02-20', endDate: new Date().toUTCString() })
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
});

describe('Manager should get trip statistics', () => {
  before((done) => {
    request(server)
      .post('/api/auth/login')
      .set('Accept', 'application/json')
      .send(user2)
      .end(async (err, res) => {
        const { token } = res.body.data;
        token1 = token;
        done();
      });
  });

  it('Manager should not be able to get statistics when the date field is invalid', (done) => {
    request(server)
      .get('/api/requests/statistics')
      .set('Accept', 'application/json')
      .set('token', `Bearer ${token1}`)
      .send({ startDate: 'twenty twenty', endDate: 'twenty nineteen' })
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

  it('Manager should not be able to get statistics when no trips were made in the provided time frame', (done) => {
    request(server)
      .get('/api/requests/statistics')
      .set('Accept', 'application/json')
      .set('token', `Bearer ${token1}`)
      .send({ startDate: '2019-02-2', endDate: '2019-02-20' })
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

  it('Manager should be able to get statistics when trips were made in the provided time frame', (done) => {
    request(server)
      .get('/api/requests/statistics')
      .set('Accept', 'application/json')
      .set('token', `Bearer ${token1}`)
      .send({ startDate: '2020-02-2', endDate: new Date().toUTCString() })
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
});
