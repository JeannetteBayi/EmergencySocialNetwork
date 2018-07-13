/**
 * Author D.Bernard
 */


'use strict'
const Announcement = require('../models/Announcement')
const expect = require('chai').expect;
const assert = require('assert')
var thisApp = require('../app.js')
var ChatController = require('../controllers/ChatController')


var author
var title
var content



suite('Announcement Model & Controller ', function() {

    test('Announcement Model should create an Announcement object', function(done) {

        var author = 'Eric'
        var title = 'Help'
        var content = 'Come&Help Me'
        var postedAt = new Date()
        var theAnnouncement = new Announcement(author, title, content, postedAt)
        expect(author).to.be.equal(theAnnouncement.getAuthor())
        expect(title).to.be.equal(theAnnouncement.getTitle())
        expect(content).to.be.equal(theAnnouncement.getContent())
        expect(postedAt).to.be.equal(theAnnouncement.getPostedAt())
        expect(theAnnouncement.toString()).to.be.a('string')
        thisApp.socketio.close()
        done()
    });

    test('#postAnnouncement() should save an announcement in the db', function(done) {

        this.timeout(10000);
        author = 'Bonheur'
        title = 'Vacation in Huye'
        content = 'Hey little brother, I amm coming this summer to Huye for the vacation'
        ChatController.postAnnouncement(author, title, content, function(err, result) {
            expect(result).to.be.an('object')
            done()
        })
    });

    this.timeout(10000);
    author = 'Bonheur'
    title = 'Vacation in Huye'
    content = 'Hey little brother, I amm coming this summer to Huye for the vacation'
    ChatController.postAnnouncement(author, title, content, function(err, result) {
        expect(result).to.be.an('object')
        done()
    })
});

test('#getLatestAnnouncements() should get a JSON list of announcements from the db', function(done) {

    this.timeout(10000);
    ChatController.getLatestAnnouncements(function(err, result) {
        expect(result['announcementData']).to.have.lengthOf.above(0)
        done()
    })

    test('#getLatestAnnouncements() should get a JSON list of announcements from the db', function(done) {

        this.timeout(10000);
        ChatController.getLatestAnnouncements(function(err, result) {
            expect(result['announcementData']).to.have.lengthOf.above(0)
            done()
        })

    });


    test('#getSearchesInAnnouncements() should get a JSON list of announcements from the db containing brother as keyword', function(done) {

        this.timeout(10000);
        ChatController.getSearchesInAnnouncements('brother', function(err, result) {
            expect(result['announcementData']).to.have.lengthOf.above(0)
            done()
        })

    });


    test('#getSearchesInAnnouncements() should get a JSON list of announcements from the db containing brother as keyword', function(done) {

        this.timeout(10000);
        ChatController.getSearchesInAnnouncements('brother', function(err, result) {
            expect(result['announcementData']).to.have.lengthOf.above(0)
            done()
        })

    });
});