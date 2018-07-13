/**
 * Author D.Bernard
 */


'use strict'

const expect = require('chai').expect;
var assert = require('assert')
var User = require('../models/User.js')
var JoinCommunityController = require('../controllers/JoinCommunity.js')
var thisApp = require('../app.js');



suite('user Model & Controller Test', function() {

    test('User Model Should create a user object', function(done) {

        var username = "Jeannette";
        var password = "d404559f602eab6fd602ac7680dacbfaadd13630335e951f097af3900e9de176b6db28512f2e000b9d04fba5133e8b1c6e8df59db3a8ab9d60be4b97cc9e81db";
        var createdAt = new Date()
        var lastLogin = new Date()
        var lastStatusCode = "OK";
        var accountStatus = "ACTIVE";
        var approvalStatus = "NO";
        var onlineStatus = "Y";
        var socketId = "";
        var theuser = new User(username, password, createdAt, lastLogin, lastStatusCode, approvalStatus, onlineStatus, socketId)
        expect(username).to.be.equal(theuser.getUsername())
        expect(password).to.be.equal(theuser.getPassword())
        expect(createdAt).to.be.equal(theuser.getCreatedAt())
        expect(lastLogin).to.be.equal(theuser.getLastLogin())
        expect(lastStatusCode).to.be.equal(theuser.getLastStatusCode())
        thisApp.socketio.close();
        done()

    });

    test('#getUserList() should get a JSON containing list of users from the db !!!', function(done) {
        this.timeout(10000);
        JoinCommunityController.getUserList(function(err, result) {
            expect(result).to.have.lengthOf.above(0)
            done()
        })
    });

    test('# registerNewUser() should register a new user !!!', function(done) {
        var user = {}
        user.username = "JeannetteTest";
        user.password = "d404559f602eab6fd602ac7680dacbfaadd13630335e951f097af3900e9de176b6db28512f2e000b9d04fba5133e8b1c6e8df59db3a8ab9d60be4b97cc9e81db";
        user.createdAt = new Date()
        user.lastLogin = new Date()
        this.timeout(10000);
        JoinCommunityController.registerNewUser(user, function(err, result) {
            expect(result.username).to.be.equal("JeannetteTest")
            done()
        })
    });

    test('# isUserRegistered() should check if the user is registered !!!', function(done){
        this.timeout(10000);
        JoinCommunityController.isUserRegistered('nayebare', function(err, result){
            expect(result.username).to.be.equal("nayebare")
            done()
        })
      });
  




    test('# verifyUserOnline() check if the user is online!!!', function(done) {
        this.timeout(10000);
        JoinCommunityController.verifyUserOnline('JeannetteTest', function(err, result) {
            expect(result.onlineStatus).to.be.equal("Y")
            done()
        })
    });


    test('# userLogin() allow registerd user to log in !!!', function(done){
        this.timeout(10000);
        JoinCommunityController.userLogin( 'JeannetteTest','d404559f602eab6fd602ac7680dacbfaadd13630335e951f097af3900e9de176b6db28512f2e000b9d04fba5133e8b1c6e8df59db3a8ab9d60be4b97cc9e81db', "1", function(err, result){
          JoinCommunityController.verifyUserOnline( 'JeannetteTest', function(err, result){
            expect(result.onlineStatus).to.be.equal("Y")
              done()
          })
        })
        
      });
    });
/*
    
      test('# updateUserStatusCode() update the current status for user!!!', function(done){
        var user = {}
        user.username = "JeannetteTest" 
        user.lastStatusCode = "HELP"
        this.timeout(10000);
        JoinCommunityController.updateLastStatusCode( user, function(err, result){
          expect(result.lastStatusCode).to.be.equal("HELP")
            done()
        })
      });


      
      test('# updateOnlineStatusForLogout() update online status for logged out user!!!', function(done) {
        this.timeout(10000);
        JoinCommunityController.updateOnlineStatusForLogout('JeannetteTest', function(err, result) {

            JoinCommunityController.verifyUserOnline('JeannetteTest', function(err, result) {
                expect(result.onlineStatus).to.be.equal("Y")
                done()
            })
         done()
        })
    });
    */
