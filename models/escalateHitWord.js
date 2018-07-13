"use strict"
var _this = this;
var mongoSchemas = require("../middleware/schemas.js");
var Promise = require('es6-promise').Promise
//var emergencyHitWordSchema = mongoSchemas.escalateEmergencyKeywords;
const DB_Controller = require('../controllers/DB_Controller.js');
var investigationSchema = mongoSchemas.Investigation;

class escalateHitWords {

    /*
           Class constructor: to initialize all user attribute for each crated on object

    */
    constructor(receiver, details, postedAt) {
       this.receiver = receiver;
       this.details = details;
       this.postedAt = postedAt;
    }


    /*Getters and setters  definition for class attributes
    */

    getReceiver(receiver) {
        return this.receiver
    }

    getDetails(details) {
        return this.details;
    }

    getPostedAt() {
        return this.postedAt;
    }

    setReceiver(receiver) {
        return this.receiver;
    }

    setDetails(details) {
        return this.details = details;
    }

    setPostedAt() {
        return this.postedAt = this.postedAt;
    }

    toString() {
        return `${this.receiver}, ${this.details}, ${this.postedAt}`
}

/*save investigation escalated message**/
    save() {

        var escalateHitWords = this
        console.log("receiver in model",this);
        return new Promise(function(resolve, reject) {
            var newInvestigation = new investigationSchema(escalateHitWords)
            newInvestigation.save(function(err, investigationDetails) {
                if (err) reject(err)
                resolve(investigationDetails)
            });
        });
    }
}

module.exports = escalateHitWords;
/*update the escalate status of the current logged in user*/

module.exports.updateUserStatusCode = async function updateUserStatusCode(theUsername, theStatusCode) {
    return new Promise(function(resolve, reject) {
        userSchema.updateOne({ "username": theUsername }, { $set: { "lastStatusCode": theStatusCode } }).exec(function(err, numAffected) {
            if (err) reject(err)
            resolve(numAffected)
        });
    })
}

/* select the inbox messages where the logged in was the receiver */
module.exports.getEscalatedMessages = async function getEscalatedMessages(username) {
    return new Promise(function (resolve, reject) {
        
        investigationSchema.find({ "receiver": username }).exec(function (err, result) {
            console.log(username);

            if (err) reject(err)
            console.log("Load further investigation:" + result);
            console.log("reaching model"+ result)
            resolve(result)
        })
    })
}


