"use strict"
var _this = this;
var mongoSchemas = require("../middleware/schemas.js");
var Promise = require('es6-promise').Promise
const dateformat = require("node.date-time");
var groupSchema = mongoSchemas.Group;



/*
               

                *Authors:
                1. Gilbert N: creating Friend model class with all related methods
                *Main Purpose:This file is to contain all user attributes and methods

*/

/*
              Required files/libraries
             
              1. DB_COntroller: this file contains db controller methods to be called by user model
              

*/




/*
           Class definition:
           1. Name: USer
           2. Attribute:
           3. Operations:



*/

class Group {

    /*
           Class constructor: to initialize all user attribute for each crated on object

    */

    constructor(groupid, ownerusername, createdAt) {

        this.groupid = groupid;
        this.ownerusername = ownerusername;
        this.createdAt = createdAt

    }

    /*
    
             Getters and setters  definition for each class attribute:
    
    
    
    */

    getGroupid() {
        return this.groupid
    }
    setGroupid(groupid) {
        this.groupid = groupid;
    }

    getOwnerusername() {
        return this.Ownerusername;
    }
    setOwnerusername(ownerusername) {
        this.ownerusername = ownerusername;
    }


    getCreatedAt() {
        return this.createdAt;
    }

    setCreatedAt(createdAt) {
        return this.createdAt = createdAt;
    }


    toString() {
        return `${this.groupid}, ${this.ownerusername}, ${this.createdAt}`;
    }

    /*
    
             Class methods definition
             
    
    
    */

    AddNewGroup(callback) {
            var groupModel = new groupSchema(this);
            groupModel.save(function(err, result) {
                if (err) {
                    console.log('Adding new group error....!' + err); //
                    callback(err, result);
                } else {
                    console.log(' New Group added successfully..');
                    callback(err, result);
                }
            });
        }
        /*
                  Method:getgroup list
                  Purpose: 
                  Parameter:
                  Return:
          */
    getAllGroupList(callback) {
        groupSchema.model('Group').find(function(err, result) {
            if (err) {
                console.log("errorr" + err); //
                callback(err, result);
            } else {
                console.log("List of found groups"); //
                console.log(result);
                callback(err, result);
            }
        });
    }

    /*
                Method: group by citizen
                Purpose: 
                Parameter:
                Return:
      */
    getCitizenGroup(citizen, callback) {
        //var friendModel = new friendSchema(citizen);
        groupSchema.find({ ownerusername: citizen }, function(err, user) {
            callback(err, user);
        });
    }
}

module.exports = Group;


//AIzaSyAfIFwltBZE - 6 ZoWJ6cwqq3QDKe4PBjF2Q