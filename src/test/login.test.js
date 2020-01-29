import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import impDB from './dataDB'
import app from '../server';

chai.use(chaiHttp);
const router = () => chai.request(app);
describe('Barefoot Nomad Login Testing suite', () => {


  it('all users should not be able to login when email field is empty', (done) => {
    router()
      .post('/auth/login')
      .send(impDB[0])
      .end((error, response) => {
        expect(response).to.have.status([400]);
        expect(response.body).to.be.a('object');
        expect(response.body).to.have.property('status');
        expect(response.body.status).to.be.equal(400);
        expect(response.body).to.have.property('message');
        expect(response.body.message).to.be.a('string');
        done(error);
      });
  });
  it('all users should not be able to login when password field is empty', (done) => {
    router()
      .post('/auth/login')
      .send(impDB[1])
      .end((error, response) => {
        expect(response).to.have.status([400]);
        expect(response.body).to.be.a('object');
        expect(response.body).to.have.property('status');
        expect(response.body.status).to.be.equal(400);
        expect(response.body).to.have.property('message');
        expect(response.body.message).to.be.a('string');
        done(error);
      });
  });

  it('all users should not be able to login when he/she used invalid email', (done) => {
    router()
      .post('/auth/login')
      .send(impDB[7])
      .end((error, response) => {
        expect(response).to.have.status([400]);
        expect(response.body).to.be.a('object');
        expect(response.body).to.have.property('status');
        expect(response.body.status).to.be.equal(400);
        expect(response.body).to.have.property('message');
        expect(response.body.message).to.be.a('string');
        done(error);
      });
  });
  
    it('all users should not be able to login when when all inserted data are incorrect', (done) => {
    router()
      .post('/auth/login')
      .send(impDB[5])
      .end((error, response) => {
        expect(response).to.have.status([404]);
        expect(response.body.status).to.be.equal(404);
        expect(response.body).to.be.a('object');
        expect(response.body).to.have.property('status');
        expect(response.body.status).to.be.equal(404);
        expect(response.body).to.have.property('error');
        done(error);
      });
  });
  it('all users should not be able to login when when all inserted password are incorrect', (done) => {
    router()
      .post('/auth/login')
      .send(impDB[6])
      .end((error, response) => {
        expect(response).to.have.status([404]);
        expect(response.body.status).to.be.equal(404);
        expect(response.body).to.be.a('object');
        expect(response.body).to.have.property('status');
        expect(response.body.status).to.be.equal(404);
        expect(response.body).to.have.property('error');
        done(error);
      });
  });


//   it('all users should not be able to login when try to use email which is not exist', (done) => {
//     router()
//       .post('/auth/login')
//       .send(impDB[13])
//       .end((error, response) => {
//         expect(response).to.have.status([401]);
//         expect(response.body).to.be.a('object');
//         expect(response.body).to.have.property('status');
//         expect(response.body.status).to.be.equal(401);
//         expect(response.body).to.have.property('message');
//         expect(response.body.message).to.be.a('string');
//         done(error);
//       });
//   });

//   it('all users should not be able to login when try to use wrong password', (done) => {
//     router()
//       .post('/auth/login')
//       .send(impDB[14])
//       .end((error, response) => {
//         expect(response).to.have.status([401]);
//         expect(response.body).to.be.a('object');
//         expect(response.body).to.have.property('status');
//         expect(response.body.status).to.be.equal(401);
//         expect(response.body).to.have.property('message');
//         expect(response.body.message).to.be.a('string');
//         done(error);
//       });
//   });
});

