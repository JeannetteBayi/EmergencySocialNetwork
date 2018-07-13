/**
 * Author D.Bernard
 */

'use strict'

const expect = require('chai').expect;
var assert = require('assert')
var Emergency = require('../models/Emergency.js')
var DonationController = require('../controllers/DonationController')
var thisApp = require('../app.js');

var title
var neededItems
var description
var postedAt

suite('Emergency Model & Donation Controller Test', function () {

  test('Emergency  Model Should create a emergency  object', function (done) {
    title = 'test'
    neededItems = { name: "Test", quantity: "200" }
    description = 'test'
    postedAt = new Date()
    var emergency = new Emergency(title, neededItems, description, postedAt)
    expect(title).to.be.equal(emergency.getTitle())
    expect(neededItems).to.be.equal(emergency.getNeededItems())
    expect(description).to.be.equal(emergency.getDescription())
    expect(postedAt).to.be.equal(emergency.getPostedAt())
    thisApp.socketio.close();
    done()

  });

  test('#saveEmergency() should save an emergency  in the db', function (done) {

    title = 'test'
    neededItems = { name: "Test", quantity: "200" }
    description = 'test'
    postedAt = new Date()
    DonationController.saveEmergency(title, neededItems.name, neededItems.quantity, description, function (err, result) {
      expect(result).to.be.an('object')
      done()
    })
  });

  test('#saveEmergency() should save an emergency  in the db and return values of created object', function (done) {
    title = 'test'
    neededItems = { name: "Test", quantity: "200" }
    description = 'test'
    postedAt = new Date()
    DonationController.saveEmergency(title, neededItems.name, neededItems.quantity, description, function (err, result) {
      expect(result.title).to.be.equal(title)
      done()
    })
  });
  

  test('#getEmergencies() should get a list of all emergencies from database', function (done) {
    this.timeout(10000);
    DonationController.getEmergencies(function (err, result) {
      expect(result).to.have.lengthOf.above(0)
      done()
    })
  });

  test('#getEmergencies() should each object have property neededItems', function (done) {
    this.timeout(10000);
    DonationController.getEmergencies(function (err, result) {
      expect(result[0]).to.have.property("neededItems")
      done()
    })
  });

  test('#getEmergencyById() should  get emergency details given it Id', function (done) {
    this.timeout(20000);
    DonationController.getEmergencyById("5adf9975a40f5423484fe059", function (err, result) {
      expect(result[0]).to.be.an('object')
      done()
    })
  });

  test('#getEmergencyById() should  return error when The Id does not exists', function () {
    this.timeout(20000);
      DonationController.getEmergencyById("5ad09015b3f5b7270c74drt3", function (err, result) {
        expect(err).to.be(true)
    })
  });


  test('#donateToEmergency() should update needed money in database when citizen donate', function (done) {
    var emergencyId = "5adf9975a40f5423484fe059"
    var moneyTodonate = 100
    this.timeout(10000);
    DonationController.donateToEmergency(emergencyId, moneyTodonate, function (err, result) {
      expect(result).to.be.an('object')
      done()
    })
  });


  test('#toString() should return a string object', function (done) {
    this.timeout(10000);
    title = 'test'
    neededItems = { name: "Test", quantity: "200" }
    description = 'test'
    postedAt = new Date()
    var emergency = new Emergency(title, neededItems, description, postedAt)
    expect(emergency.toString()).to.include('test')
    done();
  });


  
  test('#getCurrentNeededMoney() should get value of current needed money before saving new value', function () {
    var emergencyId = "5adf9975a40f5423484fe059"
    this.timeout(20000);
    var emergency = new Emergency()
   var moneyPromise =  emergency.getCurrentNeededMoney(emergencyId,)
    moneyPromise.then(function (money) {
      expect(money[0]).to.be.equal('object')
      });  
    
  });

  
})


