import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';
import UserRepository from '../repositories/userRepository';
import UserProfile from '../controllers/user.profile.controller';

chai.use(chaiHttp);
const { request } = chai;

let token2;
const token3 = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzaGFyb250QGdtYWlsLmNvbSIsImlhdCI6MTU4MDQzNTg0Mn0.BtetkRu57cq4svbTNbGhOEGvuBmdTi5dwsxHuqKevg4';
const user = {
  userName: 'Tesi',
  password: 'Fantastic7',
  email: 'sharonuase@yahoo.com'
};

before((done) => {
  request(server)
    .post('/api/auth/signup')
    .set('Accept', 'application/json')
    .send(user)
    .end(async (err, res) => {
      const { token } = res.body.data;
      token2 = token;
      await UserRepository.verify(user.email, { isVerified: true });
      done();
    });
});

it('Should return user profile data', (done) => {
  request(server)
    .get('/api/profile')
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
    profile: { password: 1 }
  };
  UserProfile.updateUser(smpl, res).then(data => {
    expect(data).to.eq(undefined);
    done();
  });
});

it('Should update user profile', (done) => {
  request(server)
    .patch('/api/profile')
    .set('Accept', 'application/json')
    .set('token', `Bearer ${token2}`)
    .field('first_name', 'Sharon')
    .field('last_name', 'Sharon')
    .field('user_name', 'Sharon')
    .field('gender', 'Female')
    .field('phone', '984747738397349479')
    .field('address', 'null')
    .field('country', 'null')
    .field('prefered_language', 'null')
    .field('prefered_currency', 'null')
    .field('company', 'null')
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

it('Should not update user profile if his/her account is not verified', (done) => {
  request(server)
    .patch('/api/profile')
    .set('Accept', 'application/json')
    .set('token', `Bearer ${token3}`)
    .field('userName', 'Sharon1')
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

it('Should not update user profile if image format is invalid', (done) => {
  request(server)
    .patch('/api/profile')
    .set('Accept', 'application/json')
    .set('token', `Bearer ${token2}`)
    .field('user_name', 'Sharon1')
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

it('Should update user profile if image format is valid', () => {
  chai.request(server)
    .patch('/api/profile')
    .set('Accept', 'application/json')
    .set('token', `Bearer ${token2}`)
    .field('user_name', 'Sharon1')
    .attach('image', 'src/test/assets/image.png', 'image.png')
    .then((res) => {
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.a.property('data');
    })
    .catch((err) => {
      throw err;
    });
});

it('Should not update user profile for more than one image', () => {
  chai.request(server)
    .patch('/api/profile')
    .set('Accept', 'application/json')
    .set('token', `Bearer ${token2}`)
    .field('user_name', 'Sharon1')
    .attach('image', 'src/test/assets/image.png', 'image.png')
    .attach('image', 'src/test/assets/image.png', 'image.png')
    .then((res) => {
      expect(res).to.have.status(500);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.a.property('error');
    })
    .catch((err) => {
      throw err;
    });
});
