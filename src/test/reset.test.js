import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';

chai.use(chaiHttp);
chai.should();

describe('User reset password test', () => {
  it('should be able to send email if account exists', done => {
    chai.request(server)
      .post('/api/auth/forget')
      .send({ email: 'fantastic7@gmail.com' })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('message', 'Link to reset password is sent to your email');
        done();
      });
  });

  it('should not be able to send email if account does not exist', done => {
    chai.request(server)
      .post('/api/auth/forget')
      .send({ email: 'mpinganzima4@gmail.com' })
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have.property('error', 'Looks like there is no account associated with your Email');
        done();
      });
  });
  it('should not be able to send email if validation errors', done => {
    chai.request(server)
      .post('/api/auth/forget')
      .send({ email: 'niyialexpgmail.com' })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('error');
        done();
      });
  });
  it('should be able to reset password', done => {
    chai.request(server)
      .patch('/api/auth/reset/fantastic7@gmail.com/Bobo12345')
      .send({ password: 'Bobobola123', confirmPassword: 'Bobobola123' })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('message', 'Password is updated successfully');
        done();
      });
  });
  it('should not be able to reset password if password do not match', done => {
    chai.request(server)
      .patch('/api/auth/reset/mhj@admin.com/Bobo12345')
      .send({ password: 'Bobobola123', confirmPassword: 'Bobobola123456' })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('error', 'Password does not match');
        done();
      });
  });
  it('should not be able to reset password if user does not exist', done => {
    chai.request(server)
      .patch('/api/auth/reset/niyialexp@gmail.com/Bobo12345')
      .send({ password: 'Bobobola123', confirmPassword: 'Bobobola123' })
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have.property('error', 'User with that email is not found');
        done();
      });
  });
  it('should not be able to reset password if there are validation errors', done => {
    chai.request(server)
      .patch('/api/auth/reset/mhj@admin.com/Bobo12345')
      .send({ password: 'Bobobola123' })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('error');
        done();
      });
  });
});
