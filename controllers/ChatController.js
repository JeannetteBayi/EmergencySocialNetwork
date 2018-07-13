"use strict"

var Message = require('../models/Message.js');
var User = require('../models/User.js');
var StatusCrumb = require('../models/StatusCrumb.js')
const dateformat = require("node.date-time");
const SocketController = require('../controllers/SocketController');
var Announcement = require("../models/Announcement.js");
const thisApp = require('../app.js');
var theSocketController

var theAnnouncement
var announcementDataJSON

/**
 * Creates and saves the Announcement Object in the database
 * @param {*} theAuthor 
 * @param {*} theTitle 
 * @param {*} theContent
 * @returns the JSON containing the saved announcement details otherwise
 * @returns error
 */
module.exports.postAnnouncement = async function postAnnouncement(theAuthor, theTitle, theContent, callback) {
    console.log("posting announcement from chat controller");
    var timeStamp = new Date()
    theAnnouncement = new Announcement(theAuthor, theTitle, theContent, timeStamp);
    theAnnouncement.save().then(function (announcementDetails) {
        broadcastAnnouncement(theAnnouncement)
        callback(false, announcementDetails)
    }).catch((err) => {
        console.log("SAVING ANNOUNCEMENT ERROR : \n" + err)
        callback(true, err)
    });
}

async function broadcastAnnouncement(theAnnouncement) {
    theSocketController = new SocketController(thisApp.socketio);
    theSocketController.Broadcast('NewAnnouncement', theAnnouncement);
}


/**
 * Get the 10 latest  announcements from the db
 * @param {*} callback 
 * @returns a JSON containing the the 10 latests announcements otherwise,
 * @returns error occured during the operation
 */
module.exports.getLatestAnnouncements = async function getLatestAnnouncements(callback) {
    console.log("Getting latest annuncement in chat controller");

    announcementDataJSON = { announcementData: [] }

    Announcement.getLatestAnnouncements().then(function (announcements) {

        for (var announcement of announcements) {
            theAnnouncement = new Announcement(announcement.author, announcement.title,
                announcement.content, announcement.postedAt)

            announcementDataJSON.announcementData.push({
                "AnnouncementObject": theAnnouncement
            })
        }

        callback(false, announcementDataJSON)

    }).catch((err) => {

        console.log("ANNOUNCEMENTS RETRIEVAL ERROR : \n" + err)
        callback(true, err)
    })

}



/**
 * Get the announcements containing the specified keyword
 * @param {*} keyword
 * @returns list of announcements in JSON 
 * @returns error occured during the operation
 */

module.exports.getSearchesInAnnouncements = async function getSearchesInAnnouncements(keyword, callback) {
    console.log("Searching in chat controller");

    announcementDataJSON = { announcementData: [] }

    await Announcement.getSearchesInAnnouncements(keyword).then(function (announcementSearchResults) {

        for (var announcementResult of announcementSearchResults) {
            theAnnouncement = new Announcement(announcementResult.author, announcementResult.title,
                announcementResult.content, announcementResult.postedAt)

            announcementDataJSON.announcementData.push({
                "AnnouncementObject": theAnnouncement
            })
        }
        callback(false, announcementDataJSON)

    }).catch((err) => {

        callback(true, err)
    })
}

/**
 * Variables to be used throughout the execution of this function
 */
var messagesDataJSON

var theMessage



module.exports.postMessage = async function postMessage(author, target, content, callback) {
    var messageType
    var groupTag

    if (target === "public") {
        messageType = "WALL"
        groupTag = "default"
    } else if (target == "group") {
        messageType = "CHAT"
        groupTag = "group_" + author;
    } else {
        messageType = "CHAT"
        groupTag = "default"
    }

    var datetime = new Date()
    var theMessage = new Message(author, target, content, messageType, datetime, groupTag)

    theMessage.save().then(async function (feedback) {

        /**
         * Send the message i.e. broadcasted or sent to a particular user
         */
        var sentStatus = await sendMessage(theMessage)

        callback(false, feedback)
    })
        .catch((err) => {
            callback(err, "")
        })
}



/**
 * Send a Message object to its target
 * @param {*} theMessage 
 * @param {*} callback 
 */
async function sendMessage(msg) {

    /**
     * Send the message along with the health status of the sender and the target (if not public)
     * Get the status of the sender by querying the status code of the sender and the target (if not public)
     * Provide the name of the sender and the target (if not public) and the datetime this message was posted
     */

    appendStatusCodeToMessage(msg).then(function (messageDataJSON) {

        if (msg.getTarget() == "public") // broadcast this message
        {

            theSocketController = new SocketController(thisApp.socketio);

            theSocketController.Broadcast("NewPublicMessage", messageDataJSON);

        }

        if (msg.getTarget() == "group") {
            theSocketController = new SocketController(thisApp.socketio);
            theSocketController.Broadcast("NewGroupMessage", messageDataJSON);

        }
    }).catch((err) => {
        console.log(err)

    })
}


module.exports.getLatestMessagesAndStatusCode = async function getLatestMessagesAndStatusCode(author, target, callback) {

    messagesDataJSON = { messageAndStatusCode: [] }
    /**
     * Get the recent messages
     */
    await Message.getLatestMessages(author, target).then(async function (theMessagesData) {
        var sortedMessageData = theMessagesData.sort(sortByProperty('postedAt'));

        for (var messageData of sortedMessageData) {
            theMessage = new Message(messageData.author, messageData.target, messageData.content,
                messageData.messageType, messageData.postedAt)

            await appendStatusCodeToMessage(theMessage).then(function (messageDataJSON) {

                messagesDataJSON.messageAndStatusCode.push(messageDataJSON)
            }).catch((err) => {
                console.log(err)
                callback(true, err)
            })
        }


        callback(false, messagesDataJSON)

    }).catch((err) => {

        //callback(true, err)
    })

}



/**
 * Append the status code of the both message author and target into a json object
 * @param {*} messageData 
 * @returns messageDataJSON containing the messageData and the status code of both the author and the target (if not pulic)
 */
async function appendStatusCodeToMessage(msg) {

    var processedMessagesData
    var status = {};

    var author_status_code = await StatusCrumb.getLatestStatusCode(msg.getAuthor(), msg.getPostTime());
    if (msg.getTarget() == "public") {
        processedMessagesData = {
            "MessageObject": msg,
            "AuthorStatusCode": author_status_code
        }

    } else {
        var target_status_code = await StatusCrumb.getLatestStatusCode(msg.getTarget(), msg.getPostTime())
        processedMessagesData = {
            "MessageObject": msg,
            "AuthorStatusCode": author_status_code,
            "TargetStatusCode": target_status_code
        }
    }

    return processedMessagesData
}




/**
 * Get the list of public messages where the specified keyword appear
 * @param {*} keyword 
 * @param {*} callback
 * @returns the list of messages in JSON  
 */
module.exports.getSearchesInPublicMessages = async function getSearchesInPublicMessages(keyword, callback) 
{

    messagesDataJSON = { messageAndStatusCode: [] }

    await Message.searchInPublicMessages(keyword).then(async function (publicMessageSearchResults) {

        for (var publicMessageResult of publicMessageSearchResults) {
            theMessage = new Message(publicMessageResult.author, publicMessageResult.target,
                publicMessageResult.content, publicMessageResult.messageType, publicMessageResult.postedAt)

            await appendStatusCodeToMessage(theMessage).then(function (messageDataJSON) {

                messagesDataJSON.messageAndStatusCode.push(messageDataJSON)

            }).catch((err) => {

                console.log(err)
                callback(true, err)

            })

        }

        callback(false, messagesDataJSON)

    }).catch((err) => {
        console.log(err)
        callback(true, err)
    })
}




/**
 * Get the list of messages in which the specified keyword(s) appear into and
 * where the specified username is either the author or theTarget of the message
 * @param {*} keyword 
 * @param {*} username 
 * @param {*} callback
 * @returns the list of messages in JSON 
 */
module.exports.getSearchesInPrivateMessages = async function getSearchesInPrivateMessages(keyword, username, callback) 
{

    messagesDataJSON = { messageAndStatusCode: [] }

    await Message.searchInPrivateMessages(keyword, username).then(async function (privateMessageSearchResults) {

        for (var privateMessageResult of privateMessageSearchResults) {
            theMessage = new Message(privateMessageResult.author, privateMessageResult.target,
                privateMessageResult.content, privateMessageResult.messageType, privateMessageResult.postedAt)

            await appendStatusCodeToMessage(theMessage).then(function (messageDataJSON) {

                messagesDataJSON.messageAndStatusCode.push(messageDataJSON)
            }).catch((err) => {

                console.log(err)
                callback(true, err)

            })
        }
        callback(false, messagesDataJSON)

    }).catch((err) => {

        console.log(err)
        callback(true, err)
    })

    //callback(false, messagesDataJSON)
}

/*

StatusCrumb.getLatestStatusCode("gilbert", "2018-04-09T05:41:32.997Z").then(function(feedback) {
    console.log("trying to get result")
    console.log(feedback);
}).catch(err => {
    console.log("there is an error")
    console.log(feedback);
})*/

var sortByProperty = function(property) {
    return function(x, y) {
        return ((x[property] === y[property]) ? 0 : ((x[property] > y[property]) ? 1 : -1));
    };
};
