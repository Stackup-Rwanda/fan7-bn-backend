import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';

chai.use(chaiHttp);
const { request } = chai;

let token2;
let token3;
const user = {
  password: 'Kemmy123',
  email: 'fantastic6@gmail.com'
};

const user1 = {
  password: 'Kemmy123',
  email: 'elvis@gmail.com'
};

before((done) => {
  request(server)
    .post('/api/auth/login')
    .set('Accept', 'application/json')
    .send(user)
    .end((err, res) => {
      const { token } = res.body.data;
      token2 = token;
      done();
    });
});

it('Should mark notification as read', (done) => {
  request(server)
    .patch('/api/notifications/3/read')
    .set('Accept', 'application/json')
    .set('token', `Bearer ${token2}`)
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

it('Should mark all notifications as read', (done) => {
  request(server)
    .patch('/api/notifications')
    .set('Accept', 'application/json')
    .set('token', `Bearer ${token2}`)
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

it('Should mark notification as unread', (done) => {
  request(server)
    .patch('/api/notifications/1/unread')
    .set('Accept', 'application/json')
    .set('token', `Bearer ${token2}`)
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
it('Should mark notification as unread', (done) => {
  request(server)
    .patch('/api/notifications/105/unread')
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

it('Should not mark notification as read if the notification is not found', (done) => {
  request(server)
    .patch('/api/notifications/10')
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

it('Should not mark notification as read if the notification id is invalid', (done) => {
  request(server)
    .patch('/api/notifications/invalidId/read')
    .set('Accept', 'application/json')
    .set('token', `Bearer ${token2}`)
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

it('Should get all notifications', (done) => {
  request(server)
    .get('/api/notifications')
    .set('Accept', 'application/json')
    .set('token', `Bearer ${token2}`)
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

it('Should get one notification', (done) => {
  request(server)
    .get('/api/notifications/1')
    .set('Accept', 'application/json')
    .set('token', `Bearer ${token2}`)
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

it('Should get read/unread notifications', (done) => {
  request(server)
    .get('/api/notifications/status/read')
    .set('Accept', 'application/json')
    .set('token', `Bearer ${token2}`)
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

it('Should not get one notification if not found', (done) => {
  request(server)
    .get('/api/notifications/10')
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

it('Should not get read/unread notifications when the specified param is invalid', (done) => {
  request(server)
    .get('/api/notifications/status/readunread')
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

describe('other tests', () => {
  before(done => {
    request(server)
      .post('/api/auth/login')
      .set('Accept', 'application/json')
      .send(user1)
      .end((err, res) => {
        const { token } = res.body.data;
        token3 = token;
        done();
      });
  });

  it('Should not get all notifications if you haven\'t any notification', (done) => {
    request(server)
      .get('/api/notifications')
      .set('Accept', 'application/json')
      .set('token', `Bearer ${token3}`)
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

  it('Should change notifications preferences', (done) => {
    request(server)
      .patch('/api/notifications/preferences')
      .set('Accept', 'application/json')
      .set('token', `Bearer ${token3}`)
      .send({ emailNotification: true })
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

  it('Should not change notifications preferences if field is not boolean', (done) => {
    request(server)
      .patch('/api/notifications/preferences')
      .set('Accept', 'application/json')
      .set('token', `Bearer ${token3}`)
      .send({ emailNotification: 'invalid' })
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
});
