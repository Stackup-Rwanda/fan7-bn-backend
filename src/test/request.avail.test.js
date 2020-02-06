import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';

chai.use(chaiHttp);
const { request } = chai;

let token1;
let token2;
let token3;
const user = {
  email: 'elvisrugamba@gmail.com',
  password: 'Kemmy123'
};

const user1 = {
  email: 'elvis@gmail.com',
  password: 'Kemmy123'
};

const user2 = {
  email: 'sharon@gmail.com',
  password: 'Kemmy123'
};

const user3 = {
  email: 'kiza@gmail.com',
  password: 'Kemmy123'
};

const user4 = {
  email: 'elru@gmail.com',
  password: 'Kemmy123'
};

describe('Manager request', () => {
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

  it('Should approve his direct reports request', (done) => {
    request(server)
      .patch('/api/requests/2/approve')
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

  it('Should not approve other\'s direct reports request', (done) => {
    request(server)
      .patch('/api/requests/3/approve')
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

  it('Should return his direct reports request', (done) => {
    request(server)
      .get('/api/requests/')
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

  it('Should return his pending direct reports request', (done) => {
    request(server)
      .get('/api/requests/status/pending')
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
});

describe('Requester', () => {
  before((done) => {
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

  it('Should not approve request if his not manager', (done) => {
    request(server)
      .patch('/api/requests/2/approve')
      .set('Accept', 'application/json')
      .set('token', `Bearer ${token2}`)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res).to.have.status(403);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.a.property('error');
        return done();
      });
  });

  it('Should return his requests', (done) => {
    request(server)
      .get('/api/requests/1')
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

  it('Should not return other users requests', (done) => {
    request(server)
      .get('/api/requests/3')
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

describe('Super admin request', () => {
  before((done) => {
    request(server)
      .post('/api/auth/login')
      .set('Accept', 'application/json')
      .send(user2)
      .end(async (err, res) => {
        const { token } = res.body.data;
        token3 = token;
        done();
      });
  });

  it('Should return all requests', (done) => {
    request(server)
      .get('/api/requests')
      .set('Accept', 'application/json')
      .set('token', `Bearer ${token3}`)
      .then(res => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.a.property('data');
        return done();
      })
      .catch(err => done(err));
  });

  it('Should return specific request', (done) => {
    request(server)
      .get('/api/requests/1')
      .set('Accept', 'application/json')
      .set('token', `Bearer ${token3}`)
      .then(res => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.a.property('data');
        return done();
      })
      .catch(err => done(err));
  });
});

describe('Other manager request', () => {
  before((done) => {
    request(server)
      .post('/api/auth/login')
      .set('Accept', 'application/json')
      .send(user3)
      .end(async (err, res) => {
        const { token } = res.body.data;
        token3 = token;
        done();
      });
  });

  it('Should not return requests if no direct reports', (done) => {
    request(server)
      .get('/api/requests')
      .set('Accept', 'application/json')
      .set('token', `Bearer ${token3}`)
      .then(res => {
        expect(res).to.have.status(404);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.a.property('error');
        return done();
      })
      .catch(err => done(err));
  });

  it('Should not return specific request if no direct reports', (done) => {
    request(server)
      .get('/api/requests/1')
      .set('Accept', 'application/json')
      .set('token', `Bearer ${token3}`)
      .then(res => {
        expect(res).to.have.status(404);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.a.property('error');
        return done();
      })
      .catch(err => done(err));
  });

  it('Should not return pending requests if no direct reports', (done) => {
    request(server)
      .get('/api/requests/status/pending')
      .set('Accept', 'application/json')
      .set('token', `Bearer ${token3}`)
      .then(res => {
        expect(res).to.have.status(404);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.a.property('error');
        return done();
      })
      .catch(err => done(err));
  });
});

describe('Other requester', () => {
  before((done) => {
    request(server)
      .post('/api/auth/login')
      .set('Accept', 'application/json')
      .send(user4)
      .end(async (err, res) => {
        const { token } = res.body.data;
        token3 = token;
        done();
      });
  });

  it('Should not return requests if no request found', (done) => {
    request(server)
      .get('/api/requests')
      .set('Accept', 'application/json')
      .set('token', `Bearer ${token3}`)
      .then(res => {
        expect(res).to.have.status(404);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.a.property('error');
        return done();
      })
      .catch(err => done(err));
  });

  it('Should not return pending requests if no request found', (done) => {
    request(server)
      .get('/api/requests/status/pending')
      .set('Accept', 'application/json')
      .set('token', `Bearer ${token3}`)
      .then(res => {
        expect(res).to.have.status(404);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.a.property('error');
        return done();
      })
      .catch(err => done(err));
  });
});
