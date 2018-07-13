var bodyParser = require('body-parser');
var urlencoded = bodyParser.urlencoded({ extended: false });

var statusCrumb = require("../models/StatusCrumb.js")
let date = require('node-datetime');
var session = require('express-session');
var moment = require('moment');
const dateformat = require("node.date-time");
const thisApp = require('../app.js');
const SocketController = require('../controllers/SocketController');
var theSocketController
var userModel = require("../models/User.js");

var messageModel = require("../models/Message.js");
var groupModel = require("../models/Group.js");
var statusCrumb = require("../models/StatusCrumb.js");
var timeStamp = moment().format();
var friendModel = require("../models/Friend.js");

var datetime = new Date();

var newFriend;
/*
                           Method name:enable group 
                           Purpose:
                           Parameters:
                           Return:
       */

exports.createNewGroup = async function createNewGroup(username, callback) {
    console.log("enabling group");
    var groupid = "group_" + username;

    var newGroup = new groupModel(groupid, username, datetime);
    newGroup.AddNewGroup(function(err, result) {
        console.log("Adding New Group:" + result);
        callback(err, result);
    });
}
exports.addNewGroupFriend = async function addNewGroupFriend(friendData, callback) {
    //friendStatus, groupidStatus, joinUser, ownerUser, status, groupid, lastupdate, createdAt
    console.log("Inviting a friend:" + friendData);
    var groupid = "group_";

    newFriend = new friendModel(friendData.friendstatus, friendData.groupstatus, friendData.friend, friendData.username, friendData.status, friendData.group, datetime, datetime);
    newFriend.AddNewFriend(function(err, result) {
        console.log("Inviting New Friend :" + result);
        callback(err, result);
    });
}

exports.GetFriendReport = async function GetFriendReport(username, callback) {
    console.log("Getting user list:" + username);
    newFriend = new friendModel();
    newFriend.myfriendListData(username, function(err, result) {
        console.log("FriendList :" + result);
        callback(err, result);
    });
}


//not tested yet ____--------------______________-------_________________
exports.updateFriendGroupStatus = async function updateFriendGroupStatus(statusData, callback) {
    console.log("Getting Controller for update:");
    var statuslog = {};
    statuslog.owner = statusData.owner;
    statuslog.joiner = statusData.joiner;
    statuslog.fstatus = statusData.friendstatus;
    statuslog.gstatus = statusData.groupstatus;
    statuslog.status = statusData.status;
    statuslog.group = statusData.group;
    newFriend = new friendModel();
    // var friendModel = new friendModel("pended_friend", "No Request", friendData.friend, friendData.username, "pending_Friend", friendData.group, datetime, datetime);
    newFriend.updateFriendGroupStatus(statuslog, function(err, result) {
        console.log("Update results:" + result);
        callback(err, result);
    });
}

exports.getCitizenGroup = async function getCitizenGroup(username, callback) {
    console.log("Getting Controller for groups:");
    var newGroup = new groupModel();
    // var friendModel = new friendModel("pended_friend", "No Request", friendData.friend, friendData.username, "pending_Friend", friendData.group, datetime, datetime);
    newGroup.getCitizenGroup(username, function(err, result) {
        console.log("group:" + result);
        callback(err, result);
    });
}


//not tested yet ____--------------______________-------_________________
exports.getFriendGroupListByCitizen = async function getFriendGroupListByCitizen(username, callback) {
    console.log("Getting Controller for groups:");
    //var newGroup = new groupModel();

    newFriend = new friendModel();
    newFriend.getFriendGroupListByCitizen(username, function(err, result) {
        console.log("group:" + result);
        callback(err, result);
    });
}

//not tested yet ____--------------______________-------_________________
exports.getListAllStatuscrumb = async function getListAllStatuscrumb(callback) {
    statusCrumb.getAllStatuscode(function(err, docs) {
        // console.log(docs);
        callback(err, docs);
    });
}

var newGroup = new groupModel();
newGroup.getCitizenGroup("gilbert", function(err, result) {
    console.log("group:" + result);
    //callback(err, result);
});