/**
 * Author D.Bernard
 */

 
'use strict'

const expect = require('chai').expect;
var assert = require('assert')
var EmergencyRoom = require('../models/EmergencyRoom.js')
var ERController = require('../controllers/ERController')

var name_
var lat_
var lgn_
var services_
var maxpatients_
var npatients_
var ER

/*

suite('Show Emergency Room model & controller', function(){

    test('Emergency Room model should create an Emergency Room Object', function(done){

        name_ = 'Zone 8'
        lat_ = -1.951497
        lgn_ = 30.088486
        services_ = 'Example Service 1, Example Service 2, Example Service 3'
        maxpatients_ = 50
        npatients_ = 10

        var theER = new EmergencyRoom(name_, lat_, lgn_, services_, maxpatients_, npatients_)
        expect(name_).to.be.equal(theER.getName())
        expect(lat_).to.be.equal(theER.getLat())
        expect(lgn_).to.be.equal(theER.getLng())
        expect(services_).to.be.equal(theER.getServices())
        expect(maxpatients_).to.be.equal(theER.getMaxPatients())
        expect(npatients_).to.be.equal(theER.getNPatients())
        expect(theER.toString()).to.be.a('string')
        done()
    })
            

    test('saveER() should not save the ER object with invalid attributes into the db', function(done){
        
        name_ = 'Zone 8'
        lat_ = 'salut'
        lgn_ = 'salut'
        services_ = 'Example Service 1, Example Service 2, Example Service 3'
        maxpatients_ = 50
        npatients_ = 10
        var data = {name:name_, latitude:lat_, longitude:lgn_, services:services_, maxpatients:maxpatients_, npatients:npatients_}
        ER = new EmergencyRoom()
        this.timeout(10000);
        
        ERController.saveER(ER, data, function(err,result){
            expect(err).to.be.true
            done()
        })
    })



    test('saveER() should save the ER object into the db', function(done){
        
        name_ = 'Zone 8'
        lat_ = -1.951497
        lgn_ = 30.088486
        services_ = 'Example Service 1, Example Service 2, Example Service 3'
        maxpatients_ = 50
        npatients_ = 10
        var data = {name:name_, latitude:lat_, longitude:lgn_, services:services_, maxpatients:maxpatients_, npatients:npatients_}
        ER = new EmergencyRoom()
        this.timeout(10000);
        
        ERController.saveER(ER, data, function(err,result){
            expect(result).to.be.an('object')
            done()
        })
    })

    
   test('getERMetadata() should get a JSON containing list of ERs from the db', function(done){
    ER = new EmergencyRoom()
    this.timeout(10000);
        ERController.getERMetadata(ER, function(err,result){
            expect(result).to.have.lengthOf.above(0)
            done()
        })
      })


      test('removeER() should delete the ER object with -1.951497 and  30.088486 as latitude, longitude respectively', function(done){
        lat_ = -1.951497
        lgn_ = 30.088486
        var data = {latitude:lat_, longitude:lgn_}
        ER = new EmergencyRoom()
        this.timeout(10000);
            ERController.removeER(ER, data, function(err,result){
                expect(result.n).to.be.equal(1)
                done()
            })
          })
})
*/