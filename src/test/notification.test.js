import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';
import UserProfile from '../controllers/user.profile.controller';

chai.use(chaiHttp);
const { request } = chai;

let token2;
const user = {
  password: 'Kemmy123',
  email: 'fantastic6@gmail.com'
};

before((done) => {
  request(server)
    .post('/api/auth/login')
    .set('Accept', 'application/json')
    .send(user)
    .end(async (err, res) => {
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

it('Should not return user profile data on 500 error', (done) => {
  const res = {
    status: () => ({
      json: ({ st, err }) => ({ st, err })
    })
  };
  const smpl = {
    userData: { email: 'test@gmail.com' }
  };
  UserProfile.getUser(smpl, res).then(data => {
    expect(data).to.eq(undefined);
    done();
  });
});

it('Should not update user profile on 500 error', (done) => {
  const res = {
    status: () => ({
      json: ({ st, err }) => ({ st, err })
    })
  };
  const smpl = {
    userData: { id: 1, email: 'test@gmail.com' },
    profileData: { password: 1 }
  };
  UserProfile.updateUser(smpl, res).then(data => {
    expect(data).to.eq(undefined);
    done();
  });
});
