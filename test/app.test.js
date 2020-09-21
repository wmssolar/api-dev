//During the test the env variable is set to test
process.env.NODE_ENV = 'test';
let mongoose = require("mongoose");
 var expect = require('chai').expect
var chai = require('chai')
  , chaiHttp = require('chai-http');
const should = chai.should();

const SERVER_URL = process.env.APP_URL || "http://localhost:3000";
 

 var solarwind = require('../models/solarwdModel');
 
 
chai.use(chaiHttp);
  

describe('data', () => {

  it('success, finally',done =>{
    chai.request(SERVER_URL)
    .get('')
    .end(function(err, res){
      expect(err).to.be.null;
   
      expect(res).to.have.status(200);
      done();
    });
 

  });

});

describe('Get /api/solar', () =>{

  it('success, finally',done =>{
  chai.request(SERVER_URL)
  .get('/api/solar')
  .end(function(err, res){
    expect(err).to.be.null;
    expect(res).to.have.status(200);
    //expect(res.body.pageCount).to.equals(5000);
   
    done();
  });

  
    });
});


describe('Get /api/solar/cel', () =>{

  it('success, finally',done =>{
  chai.request(SERVER_URL)
  .get('/api/solar/cel')
  .end(function(err, res){
    expect(err).to.be.null;
 
    expect(res).to.have.status(200);
    const val = res.body.data.pop();
    expect(val.Fleet).to.equals('cel');
    // lsconsole.log(val.Fleet);
    done();
  });

  
    });
});

