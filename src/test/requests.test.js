import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';

chai.use(chaiHttp);
chai.should();

describe('Requests Test', () => {
  it('should be able to reject if line manager', done => {
    chai.request(server)
      .patch('/api/request/1/reject')
      .set(
        'token',
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ0cmV5M0BnbWFpbC5jb20iLCJpYXQiOjE1ODEwMDI3NjJ9.FGgqQWqOEYO6ovfvq_bM58pYXY0VG1-3Wm-hQ59_koE'
      )
      .end((err, res) => {
        res.status.should.be(200);
        res.body.should.have.property('message', 'Request rejected successfully');
        done();
      });
  });

  it('should not be able to reject if request not found', done => {
    chai.request(server)
      .patch('/api/request/10/reject')
      .set(
        'token',
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ0cmV5M0BnbWFpbC5jb20iLCJpYXQiOjE1ODEwMDI3NjJ9.FGgqQWqOEYO6ovfvq_bM58pYXY0VG1-3Wm-hQ59_koE'
      )
      .end((err, res) => {
        res.status.should.be(404);
        res.body.should.have.property('error', 'Sorry, the request you are looking for is not found');
        done();
      });
  });

  it('should not be able to reject if request not line manager', done => {
    chai.request(server)
      .patch('/api/request/10/reject')
      .set(
        'token',
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJmYW50YXN0aWM3QGdtYWlsLmNvbSIsImlhdCI6MTU4MTAwNDI3OH0.ch70yYv9AeO_Dt9_b1xDmbVNKxflMtYqiDESfM3aeMU'
      )
      .end((err, res) => {
        res.status.should.be(401);
        res.body.should.have.property('error', 'Unauthorized access');
        done();
      });
  });
});
