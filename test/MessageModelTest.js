/**
 * Author D.Bernard
 */


'use strict'

const expect = require('chai').expect;
var assert = require('assert')
var Message = require('../models/Message.js')
var ChatController = require('../controllers/ChatController')
var thisApp = require('../app.js');
var app = require('../app.js');

var author
var target
var content
var type
var postedAt


suite('Message Model & Controller Test', function () {

    test('Message Model Should create a message object', function (done) {

        author = 'Bernard'
        target = 'public'
        content = 'Salut les Zeros!'
        type = 'CHAT'
        postedAt = new Date()

        var theMessage = new Message(author, target, content, type, postedAt)

        expect(author).to.be.equal(theMessage.getAuthor())
        expect(target).to.be.equal(theMessage.getTarget())
        expect(content).to.be.equal(theMessage.getContent())
        expect(type).to.be.equal(theMessage.getMessageType())
        expect(postedAt).to.be.equal(theMessage.getPostTime())
        expect(theMessage.toString()).to.be.a('string')
        thisApp.socketio.close();
        done()

    });



    test('postMessage() should save a message object in the db', function (done) {
        this.timeout(10000)
        ChatController.postMessage('MTV', 'CNN', 'I entertain people more than you do!', function (err, result) {
            expect(result).to.be.an('object')
            done()
        })

    })

});
    /*test('getLatestMessagesAndStatusCode() should get a JSON containing list of latest messages from the db', function (done) {

        this.timeout(20000);
        ChatController.getLatestMessagesAndStatusCode('MTV','NTV', function (err, result) {
            expect(result['messageAndStatusCode']).to.have.lengthOf.above(0)
            done()
        })
    })*/

    /*test('postMessage() should save a message object in the db', function(done) {
        this.timeout(10000)
        ChatController.postMessage('Bernard', 'public', 'I am joining the marines this summer!', function (err, result) {
            expect(result).to.be.an('object')
            done()
        })

    })

    /*test('getSearchesInPublicMessages() should get a JSON list of public messages from the db containing marines as keyword', function(done) {

        this.timeout(30000);
        ChatController.getSearchesInPublicMessages('marines', function (err, result) {
            expect(result['messageAndStatusCode']).to.have.lengthOf.above(0)
            done()
        })
    })*/


    /*test('getSearchesInPrivateMessages() should get a JSON list of private messages from the db containing people as keyword', function(done) {

        this.timeout(20000);
        ChatController.getSearchesInPrivateMessages('CNN', function (err, result) {
            expect(result['messageAndStatusCode']).to.have.lengthOf.above(0)
            done()
        })
    })

})*/
