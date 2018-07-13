var moment = require('moment');
const dateformat = require("node.date-time");
const thisApp = require('../app.js');
const SocketController = require('../controllers/SocketController');
var theSocketController
var userModel = require("../models/User.js");
var friendModel = require("../models/Friend.js");
var messageModel = require("../models/Message.js");
var groupModel = require("../models/Group.js");
var statusCrumb = require("../models/StatusCrumb.js");
var timeStamp = moment().format();
var datetime = new Date();


//adding new groupModel
var newGroup = new groupModel("Group_gilbert", "gilbert", datetime);
newGroup.AddNewGroup(function(err, result) {
    console.log("Adding New Group:" + result);
});

var friendModel = new friendModel("pended_friend", "No Request", "ibare", "gilbert", "pending_Friend", "group_gilbert", datetime, datetime);
friendModel.AddNewFriend(function(err, result) {
    console.log("Inviting New Friend :" + result);
});
var data = {};
//module.exports = emergencycontroller;t
newFriend = new friendModel("pended_friend", "No Request", "ibare", "gilbert", "pending_Friend", "group_gilbert", datetime, datetime);
// var friendModel = new friendModel("pended_friend", "No Request", friendData.friend, friendData.username, "pending_Friend", friendData.group, datetime, datetime);
this.addNewGroupFriend(data, function(err, result) {
    console.log("Inviting New Friend :" + result);
    // callback(err, result);
});

//me


newFriend = new friendModel();
// var friendModel = new friendModel("pended_friend", "No Request", friendData.friend, friendData.username, "pending_Friend", friendData.group, datetime, datetime);
newFriend.myfriendListData("gilbert", function(err, result) {
    console.log("FriendList :" + result);
    //callback(err, result);
});


var statuslog = {};
statuslog.owner = "gilbert";
statuslog.joiner = "Bonheur";
statuslog.fstatus = "approved";
statuslog.gstatus = "enabled";
statuslog.status = "friend";

newFriend = new friendModel();
//status = "friend";groupstatus = "enabled";friendstatus = "approved";
// var friendModel = new friendModel("pended_friend", "No Request", friendData.friend, friendData.username, "pending_Friend", friendData.group, datetime, datetime);
newFriend.updateFriendGroupStatus(statuslog, function(err, result) {
    if (err) {
        console.log("Err:" + err)
    } else {
        console.log("result:" + result);
    }
    //
    //

    //  allback(err, result);
});


var newGroup = new groupModel();
newGroup.getCitizenGroup("gilbert", function(err, result) {
    console.log("group:" + result);
    //callback(err, result);
});

statusCrumb.getAllStatuscode(function(err, docs) {
    console.log(docs);
});