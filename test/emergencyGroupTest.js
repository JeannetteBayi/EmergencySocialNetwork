/**
 * Author Micheal and Gilbert
 */


'use strict'

const expect = require('chai').expect;
var assert = require('assert');
var groupModel = require("../models/Group.js");
var User = require('../models/User.js')
var Friend = require('../models/Friend.js')
var JoinCommunityController = require('../controllers/JoinCommunity.js')
var EmergencyGroup = require('../controllers/emergencygroup.js');
var Group = require('../models/Group.js');
var thisApp = require('../app.js');

suite('Group Model & Emergency Controller Test', function() {

    //should create an emergency group object
    
    test('#01 should create an emergency group object', function(done) {

       var groupid = 'nayebare_group';
       var ownerusername = 'nayebare';
       var createdAt = new Date();

        var newGroup = new Group(groupid, ownerusername, createdAt)
        expect(groupid).to.be.equal(newGroup.getGroupid())
        expect(createdAt).to.be.equal(newGroup.getCreatedAt())
        expect(newGroup.toString()).to.be.a('string')
        thisApp.socketio.close()
        done()
    });


    test('#getCitizenGroup() should get a JSON containing list of groups !!!', function(done) {
        var username = "gilbert";
        EmergencyGroup.getCitizenGroup(username, function(err, result) {
            expect(result).to.have.lengthOf.above(0)
            done()
        });
    });

    test('#.GetFriendReport() should get a JSON containing friend list from the db !!!', function(done) {
        var username = "gilbert";
        EmergencyGroup.GetFriendReport(username, function(err, result) {
            expect(result).to.have.lengthOf.above(0)
            done()
        });
    });

//get citizen group
    test('#.GetCitizen group', function(done) {
        var username = "gilbert";
        EmergencyGroup.GetFriendReport(username, function(err, result) {
            expect(result).to.have.lengthOf.above(0)
            done()
        });
    });


    test('# createNewGroup shuold create a new group whose group Id is group_+username', function(done) {
        var username = "Jeannette";
        EmergencyGroup.createNewGroup(username, function(err, result) {
            expect(result.groupid).to.be.equal('group_Jeannette')
            done()
        });
    });
    

    test('#  shuold create a new freind object', function() {
        var friend = new Friend ("approved", "approved", "Micheal", "Jeannette", "grouped", "group_Jeannette", new Date(), new Date ())
        expect("approved").to.be.equal(friend.getFriendStatus())
        expect("approved").to.be.equal(friend.getgroupStatus())
        expect("group_Jeannette").to.be.equal(friend.getGroupid())
        expect("Jeannette").to.be.equal(friend.getOwnerUser())
        expect("Micheal").to.be.equal(friend.getJoinUser())
    });

    
    test('# addNewGroupFriend() shuold add a new friend to a groul', function(done) {
       var friend  = {};
       friend.friendstatus = "approved"
       friend.groupstatus = "approved"
       friend.friend = "Micheal"
       friend.username = "Jeannette"
       friend.status = "approved"
       friend.status = "grouped"
       friend.group = "group_Jeannette"
        EmergencyGroup.addNewGroupFriend(friend, function(err, result) {
            expect(result.groupid).to.be.equal('group_Jeannette')
            expect(result.joinUser).to.be.equal('Micheal')
            expect(result.friendStatus).to.be.equal('approved')
            done()
        });
    });


    //get citizen group
    test('#.getFriendGroupListByCitizen should get citizens friends groupped by citizen', function(done) {
        var username = "Janet";
        EmergencyGroup.getFriendGroupListByCitizen("Janet", function(err, result) {
            expect(result).to.have.lengthOf(0)
            done()
        });
    });
    

/*
    test('#.getListAllStatuscrumb should get the list of all status scrumb', function(done) {
        EmergencyGroup.getListAllStatuscrumb(function(err, result) {
            expect(result).to.have.lengthOf.above(0)
            done()
        });
    });
    
    */

    //testing for friend 
});
