import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';
import AccommodationController from '../controllers/accommodation.controller';
import AccommodationMiddleware from '../middlewares/accommodation.middleware';

chai.use(chaiHttp);
const { request } = chai;

let token1;
let token2;
const user = {
  email: 'mutesisharon@hotmail.com',
  password: 'Kemmy123'
};

const user1 = {
  email: 'sharon@gmail.com',
  password: 'Kemmy123'
};

describe('Accommodations', () => {
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

  it('Should add accommodations', (done) => {
    request(server)
      .post('/api/accommodations')
      .set('Accept', 'application/json')
      .set('token', `Bearer ${token1}`)
      .field('name', 'Sharon')
      .field('geoLocation', '10.7972979, 20.7593249')
      .field('rooms', 20)
      .field('services', 'Sharon')
      .field('services', 'Sharon')
      .field('amenities', 'Sharon')
      .field('amenities', 'Sharon')
      .field('address', 'kigali, Rwanda')
      .field('description', 'uegwfuiwfegwui')
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

  it('Should not add accommodations if inputs are invalid', (done) => {
    request(server)
      .post('/api/accommodations')
      .set('Accept', 'application/json')
      .set('token', `Bearer ${token1}`)
      .field('name', 'Sharon')
      .field('geoLocation', '10.797297920.7593249')
      .field('rooms', 20)
      .field('services', 'Sharon')
      .field('services', 'Sharon')
      .field('amenities', 'Sharon')
      .field('amenities', 'Sharon')
      .field('address', 'kigali, Rwanda')
      .field('description', 'uegwfuiwfegwui')
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

  it('Should not add accommodations if image is invalid', (done) => {
    request(server)
      .post('/api/accommodations')
      .set('Accept', 'application/json')
      .set('token', `Bearer ${token1}`)
      .field('name', 'Sharon')
      .field('geoLocation', '10.7972979, 20.7593249')
      .field('rooms', 20)
      .field('services', 'Sharon')
      .field('services', 'Sharon')
      .field('amenities', 'Sharon')
      .field('amenities', 'Sharon')
      .field('address', 'kigali, Rwanda')
      .field('description', 'uegwfuiwfegwui')
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

  it('Should get all accommodations', (done) => {
    request(server)
      .get('/api/accommodations')
      .set('Accept', 'application/json')
      .set('token', `Bearer ${token1}`)
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

  it('Should get specific accommodation', (done) => {
    request(server)
      .get('/api/accommodations/1')
      .set('Accept', 'application/json')
      .set('token', `Bearer ${token1}`)
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

  it('Should not get specific accommodation if not found', (done) => {
    request(server)
      .get('/api/accommodations/10')
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

describe('Accommodation', () => {
  before((done) => {
    request(server)
      .post('/api/auth/login')
      .set('Accept', 'application/json')
      .send(user1)
      .end(async (err, res) => {
        if (err) {
          return done(err);
        }
        const { token } = res.body.data;
        token2 = token;
        done();
      });
  });

  it('Should approve accommodation', (done) => {
    request(server)
      .patch('/api/accommodations/1/approve')
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

  it('Should not approve accommodation if not found', (done) => {
    request(server)
      .patch('/api/accommodations/10/approve')
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
});

it('Should not create accommodations on 500 error', (done) => {
  const res = {
    status: () => ({
      json: ({ st, err }) => ({ st, err })
    })
  };
  const smpl = {
    userData: { id: 1, email: 'test@gmail.com' },
    accommodationData: { name: 1 }
  };
  AccommodationController.createAccommodation(smpl, res).then(data => {
    expect(data).to.eq(undefined);
    done();
  });
});

it('Should not get accommodations on 500 error', (done) => {
  const res = {
    status: () => ({
      json: ({ st, err }) => ({ st, err })
    })
  };
  const smpl = {
    user: { id: 1, email: 'test@gmail.com' },
    accommodationData: { name: 1 }
  };
  AccommodationController.getAllAccommodation(smpl, res).then(data => {
    expect(data).to.eq(undefined);
    done();
  });
});

it('Should not get specific accommodation on 500 error', (done) => {
  const res = {
    status: () => ({
      json: ({ st, err }) => ({ st, err })
    })
  };
  const smpl = {
    user: { id: 1, email: 'test@gmail.com' },
    accommodationData: { name: 1 }
  };
  AccommodationController.getSpecificAccommodation(smpl, res).then(data => {
    expect(data).to.eq(undefined);
    done();
  });
});

it('Should not pass accommodation middleware on 500 error', (done) => {
  const res = {
    status: () => ({
      json: ({ st, err }) => ({ st, err })
    })
  };
  const smpl = {
    user: { id: 1, email: 'test@gmail.com' },
    accommodationData: { name: 1 }
  };
  AccommodationMiddleware.validate(smpl, res).then(data => {
    expect(data).to.eq(undefined);
    done();
  });
});

it('Should not pass accommodation middleware on 500 error', (done) => {
  const res = {
    status: () => ({
      json: ({ st, err }) => ({ st, err })
    })
  };
  const smpl = {
    user: { id: 1, email: 'test@gmail.com' },
    accommodationData: { name: 1 }
  };
  AccommodationMiddleware.isHost(smpl, res).then(data => {
    expect(data).to.eq(undefined);
    done();
  });
});

it('Should not pass accommodation middleware on 500 error', (done) => {
  const res = {
    status: () => ({
      json: ({ st, err }) => ({ st, err })
    })
  };
  const smpl = {
    user: { id: 1, email: 'test@gmail.com' },
    param: 2,
    accommodationData: { name: 1 }
  };
  AccommodationMiddleware.param(smpl, res).then(data => {
    expect(data).to.eq(undefined);
    done();
  });
});
