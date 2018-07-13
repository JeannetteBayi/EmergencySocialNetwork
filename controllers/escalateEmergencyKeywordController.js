"use strict"
var _this = this;


/*
escalate emergency hitword filter and text analysis
*/

var bodyParser = require('body-parser');
var urlencoded = bodyParser.urlencoded({ extended: false });
var userModel = require("../models/User.js");
var statusCrumb = require("../models/StatusCrumb.js")
let date = require('node-datetime');
var session = require('express-session');
var moment = require('moment');
const dateformat = require("node.date-time");
const thisApp = require('../app.js');
var Message = require('../models/Message.js');
var theSocketController
var newInvestigation

//select all latest hit word messages
module.exports.getLatestHitMessages = async function getLatestHitMessages(callback) {
    await Message.getLatestHitMessages().then(function (theMessagesData) {
        console.log("err controller" + theMessagesData);
        callback(false, theMessagesData)
    }).catch((err) => {
        console.log("investigation error: \n" + err)
        callback(true, err)
    });
}


