
"use strict"

var _this = this;
var mongoSchemas = require("../middleware/schemas.js")
var Promise = require('es6-promise').Promise
var friendSchema = mongoSchemas.Friend

const DB_Controller = require('../controllers/DB_Controller.js');

class Friend {
    constructor(friendStatus, groupStatus, joinUser, ownerUser, status, groupid, lastupdate, createdAt) {
        this.friendStatus = friendStatus
        this.groupStatus = groupStatus
        this.joinUser = joinUser
        this.ownerUser = ownerUser
        this.status = status
        this.groupid = groupid
        this.lastupdate = lastupdate
        this.createdAt = createdAt
    }

    getFriendStatus() {
        return this.friendStatus
    }
    setFriendStatus(friendStatus) {
        this.friendStatus = friendStatus;
    }
    getgroupStatus() {
        return this.groupStatus
    }
    setgroupStatus(groupStatus) {
        this.groupStatus = groupStatus;
    }

    getJoinUser() {
        return this.joinUser;
    }
    setJoinUser(joinUse) {
        this.joinUser = joinUser;
    }

    getOwnerUser() {
        return this.ownerUser;
    }

    setOwnerUser(ownerUser) {
        return this.ownerUser = ownerUser;
    }

    getStatus() {
        return this.status;
    }

    setStatus(status) {
        return this.status = status;
    }

    getGroupid() {
        return this.groupid;
    }

    setGroupid(groupid) {
        return this.groupid = groupid;
    }
    getLastupdate() {
        return this.lastupdate;
    }

    setLastupdate(lastupdate) {
        return this.lastupdate = lastupdate;
    }

    getLastLogin() {
        return this.lastLogin;
    }

    setLastLogin(lastLogin) {
        return this.lastLogin = lastLogin;
    }

    toString() {
        return `${this.friendStatus}, ${this.joinUser}, ${this.ownerUser}, ${this.status}, ${this.groupid}, ${this.lastupdate}, ${this.createdAt}`;
    }

    AddNewFriend(callback) {
        var friendModel = new friendSchema(this);
        friendModel.save(function (err, result) {
            callback(err, result);
        });
    }

    getAllFriendList(callback) {
        friendSchema.model('Friend').find(function (err, result) {
            callback(err, result);
        });
    }

    getFriendGroupListByCitizen(citizen, callback) {
        friendSchema.find({ ownerUser: citizen, groupStatus: "Grouped" }, function (err, user) {
            callback(err, user);
        });
    }


    updateFriendGroupStatus(statuslog, callback) {
        var datetime = new Date();
        friendSchema.update({ ownerUser: statuslog.owner, joinUser: statuslog.joiner }, { $set: { friendStatus: statuslog.fstatus, groupStatus: statuslog.gstatus, status: statuslog.status, lastupdate: datetime } }, { new: true }, function (err, numAffected) {
            callback(err, result)
        });
    }

    myfriendListData(username, callback) {
        friendSchema.find({ $or: [{ "ownerUser": username }, { "joinUser": username }] }).sort({ lastupdate: -1 }).exec(function (err, result) {
            callback(err, result)
        })
    }
}

module.exports = Friend