import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';

chai.use(chaiHttp);
const { request } = chai;

<<<<<<< HEAD
it('Should return error of not super admin', (done) => {
=======
it('Should return object with new role', (done) => {
>>>>>>> ft(server): assign role
  request(server)
    .patch('/api/auth/assignRole')
    .set('Accept', 'application/json')
    .set(
      'Authorization',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJmYW50YXN0aWNAZ21haWwuY29tIiwiaWF0IjoxNTgwMzcxNTE3fQ._geQhookj-O9nZ5cHVuQa6pFNyriZ48gVisYhEAzj38'
    )
    .send({
      role: 'super-administrator',
      email: 'mhj@admin.com'
    })
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

it('Should return object with new role', (done) => {
  request(server)
    .patch('/api/auth/assignRole')
    .set('Accept', 'application/json')
    .set(
      'Authorization',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJmYW50YXN0aWM3QGdtYWlsLmNvbSIsImlhdCI6MTU4MDI0MDc1NH0.frkJkunuF3yxtaIqIQYe-yo2nA5SF4WrPUmxuvb5sYs'
    )
    .send({
      role: 'super-administrator',
      email: 'bobo@gmail.com'
    })
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

<<<<<<< HEAD
it('Should return error of super-admin not exist', done => {
=======
it('Should return error of not', done => {
>>>>>>> ft(server): assign role
  request(server)
    .patch('/api/auth/assignRole')
    .set('Accept', 'application/json')
    .send({
      role: 'super-administrator',
      email: 'mhjh@admin.com'
    })
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

it('Should return error to provide token', (done) => {
  request(server)
    .patch('/api/auth/assignRole')
    .set('Accept', 'application/json')
    .send({
      role: 'super-administrator',
      email: 'mhjh@admin.com'
    })
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

it('Should return error about invalid token', (done) => {
  request(server)
    .patch('/api/auth/assignRole')
    .set('Accept', 'application/json')
    .set(
      'Authorization',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJmYW50YXN0aWM3QGdtYWlsLmNvbSIsImlhdCI6MTU4MDI0MDc1NH0.frkJgunuF3yxtaIqIQYe-yo2nA5SF4WrPUmxuvb5sYs'
    )
    .send({
      role: 'super-administrator',
      email: 'mhjh@admin.com'
    })
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

it('Should return error of invalid inputs', (done) => {
  request(server)
    .patch('/api/auth/assignRole')
    .set('Accept', 'application/json')
    .set(
      'Authorization',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJmYW50YXN0aWM3QGdtYWlsLmNvbSIsImlhdCI6MTU4MDI0MDc1NH0.frkJkunuF3yxtaIqIQYe-yo2nA5SF4WrPUmxuvb5sYs'
    )
    .send({
      role: 'super-admin',
      email: 'mhjh@admin.com'
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

it('Should return error of not found', (done) => {
  request(server)
    .patch('/api/auth/assignRole')
    .set('Accept', 'application/json')
    .set(
      'Authorization',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJmYW50YXN0aWM3QGdtYWlsLmNvbSIsImlhdCI6MTU4MDI0MDc1NH0.frkJkunuF3yxtaIqIQYe-yo2nA5SF4WrPUmxuvb5sYs'
    )
    .send({
      role: 'super-administrator',
      email: 'mhjhgkj@admin.com'
    })
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
