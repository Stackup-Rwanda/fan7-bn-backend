import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';

chai.use(chaiHttp);
chai.should();

describe('Request update Tests', () => {
  it('should be able to update if created by and status is pending', done => {
    chai.request(server)
      .patch('/api/requests/6/update')
      .set(
        'token',
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiZW1haWwiOiJlbHZpc0BnbWFpbC5jb20iLCJyb2xlIjoicmVxdWVzdGVyIiwiaWF0IjoxNTgxNDUyMTkwfQ.pWckfIXc_Ah8Cmiy11yVUvX08Y9xuQo-He8fun9sUto'
      )
      .send({ passportName: 'Bihire Boris' })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('message', 'Your request has been successfully updated');
        done();
      });
  });
  it('should not be able to update if not found', done => {
    chai.request(server)
      .patch('/api/requests/100/update')
      .set(
        'token',
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiZW1haWwiOiJlbHZpc0BnbWFpbC5jb20iLCJyb2xlIjoicmVxdWVzdGVyIiwiaWF0IjoxNTgxNDUyMTkwfQ.pWckfIXc_Ah8Cmiy11yVUvX08Y9xuQo-He8fun9sUto'
      )
      .send({ passportName: 'Bihire Boris' })
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have.property('error', 'Request not found');
        done();
      });
  });

  it('should not be able to update an approved request', done => {
    chai.request(server)
      .patch('/api/requests/1/update')
      .set(
        'token',
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiZW1haWwiOiJlbHZpc0BnbWFpbC5jb20iLCJyb2xlIjoicmVxdWVzdGVyIiwiaWF0IjoxNTgxNDUyMTkwfQ.pWckfIXc_Ah8Cmiy11yVUvX08Y9xuQo-He8fun9sUto'
      )
      .send({ passportName: 'Boris Bihire' })
      .end((err, res) => {
        res.should.have.status(403);
        res.body.should.have.property('error');
        done();
      });
  });

  it('should not be able to update if not created by', done => {
    chai.request(server)
      .patch('/api/requests/3/update')
      .set(
        'token',
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiZW1haWwiOiJlbHZpc0BnbWFpbC5jb20iLCJyb2xlIjoicmVxdWVzdGVyIiwiaWF0IjoxNTgxNDUyMTkwfQ.pWckfIXc_Ah8Cmiy11yVUvX08Y9xuQo-He8fun9sUto'
      )
      .send({ passportName: 'Boris Bihire' })
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.have.property('error', 'Unauthorized access');
        done();
      });
  });
});
