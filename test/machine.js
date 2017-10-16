process.env.NODE_ENV = 'test';

let Machines = require('../routes/machine.js');
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../main');
let should = chai.should();

chai.use(chaiHttp);


describe('/POST machine', () => {
    it('it should not POST a machine without machine name field', (done) => {
    let machine = {
        WrongParamName: "Awesome Test Machine"
    }
    chai.request(server)
        .post('/api/v1/machine')
        .send(machine)
        .end((err, res) => {
            res.should.have.status(500);
            res.body.should.be.a('object');
            res.error.text.should.equal('Missing NAME parameter');
            done();
        });
    });
});
