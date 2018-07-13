/*
               
                *Authors
                1. Gilbert N. Creating mongodb schemas using mongoose interface
                *Main Purpose:This file is to contain the schema for all db documents/tables
*/
/*
      Defining required variables for mongo db connection:
    1. mongoose library is a dependancy that should be added via nmp
    2. Schema: will help to create schema
*/

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


/*
        Database: MongoDb
        Query builder: Mongoose
        Setting up connection to mongodb 
        Local environment:download and install mongodb server from mongodb.com and assign (ip:localhost and port:20017):'mongodb://localhost:27017/fse'
        Remote environment:visit https://mlab.com and login using: username:gilbertn and password:5V1j20nnSu
        Setting up mongoose connection:mongoose.connect('mongodb://fseteamrw:fseproject@ds111059.mlab.com:11059/fse');
*/


/*             local set up mongoose: connection definition        
 */


mongoose.connect('mongodb://fseteamrw:fseproject@ds111059.mlab.com:11059/fse');


/*
                       Creating database schemas
                          1. message schemas
                          2. user
                          3.announcement
                          4. statuscrumb
*/

var userSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    lastStatusCode: String,
    accountStatus: String,
    approvalStatus: String,
    socketId: String,
    onlineStatus: String,
    lastLogin: Date,
    socketId: String,
    eaddress: String,
    eemail: String,
    ephone: String,
    elatLoc: Number,
    elongLoc: Number
});


var messageSchema = new Schema({

    author: { type: String, required: true },
    target: { type: String, required: true },
    content: String,
    messageType: String,
    postedAt: Date,
    groupTag: String,
    emergencyStatus:String 
});


var announcementSchema = new Schema({

    author: { type: String, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    postedAt: { type: Date, required: true }

});

var statuscrumbSchema = new Schema({

    username: { type: String, required: true },
    statusCode: { type: String, required: true },
    createdAt: Date,
    statusChangeReason: String
});



var emergencyroomSchema = new Schema({
    name: { type: String },
    latitude: { type: Number },
    longitude: { type: Number },
    services: { type: String },
    maxPatients: { type: Number },
    nPatients: { type: Number },
})

var emergencySchema = new Schema({
    title: { type: String, required: true },
    neededItems: {
        "name": String,
        "quantity": Number
    },
    description: String,
    postedAt: Date
});



/*
       Defining and binding physical table to defined schema:
       1. User to userSchema 
       2. Message to messageSchema
       3. Announcement to announcementSchema
       4. Statuscrumb to statuscrumbSchema
       User,Message,Annoucncement, Statuscrumb 
*/
var groupSchema = new Schema({

    groupid: { type: String, required: true },
    ownerusername: { type: String, required: true },
    createdAt: Date
});

var friendSchema = new Schema({
    friendStatus: String,
    groupStatus: String,
    joinUser: { type: String, required: true },
    ownerUser: { type: String, required: true },
    status: String,
    groupid: String,
    lastupdate: String,
    createdAt: Date

});


/*Table to store responses*/

var investigationsSchema = new Schema({
    receiver: { type: String, required: true },
    details: { type: String, required: true },
    postedAt: { type: Date, required: true }
});


var emergencySchema = new Schema({
    title: { type: String, required: true },
    neededItems: {
        "name": String,
        "quantity": Number
    },
    description: String,
    postedAt: Date
});

var users = mongoose.model('User', userSchema);
var messages = mongoose.model('Message', messageSchema);
var announcements = mongoose.model('Announcement', announcementSchema);
var statuscrumbs = mongoose.model('Statuscrumb', statuscrumbSchema);
var groups = mongoose.model('Group', groupSchema);
var friends = mongoose.model('Friend', friendSchema);
var emergencyroom = mongoose.model('EmergencyRoom', emergencyroomSchema);
var emergencies = mongoose.model('Emergency', emergencySchema);
var investigations = mongoose.model('Investigation', investigationsSchema);


/*
       Expose each created mongoose model based on defined schemas to be used when 
       this file"schemas" is imported
*/


/**
 * Defining the text indexes  and the weights on the columns
 */



var my_schemas = { 'User': users, 'Message': messages, 'Announcement': announcements, 'StatusCrumb': statuscrumbs, 'Group': groups, 'Friend': friends, 'EmergencyRoom': emergencyroom, 'Emergency': emergencies,
'Investigation': investigations };

module.exports = my_schemas;