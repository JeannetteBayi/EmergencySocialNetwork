
'use strict'
let expect = require('expect.js');
let agent = require('superagent');
let PORT = 8000;
let HOST = 'http://localhost:' + PORT;
let start = require('../app');
var assert = require('chai').assert;
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
var mocha = require('mocha');
var describe = mocha.describe;
var it = mocha.it;
const { before, after } = mocha;


describe('server', function () {

    before(function () {
        start.socketio.listen(PORT);// app being exported to socket class
    });

    after(function () {
        start.socketio.close();
    });


    describe('API route call', function () {
        it('Should assert that the result is an array ', function (done) {
            agent.get(HOST + '/users')
                .end(function (err, res) {
                    assert.isObject(res);
                    done();
                });
        });
    });


    describe('API route for searching announcements', function () {
        it('The api returns a json object ', function (done) {
            agent.get(HOST + '/search/announcements')
                .end(function (err, res) {
                    assert.ok(res)
                    done();
                });
        });
    });

    describe('API route for searching citizens', function () {
        it('The api returns a json object ', function (done) {
            agent.get(HOST + '/search/citizens')
                .end(function (err, res) {
                    assert.ok(res)
                    assert.isObject(res);
                    done();
                });
        });
    });


    describe('API route for searching citizens', function () {
        it('The api returns a json object ', function (done) {
            agent.get(HOST + '/search/publicMessages')
                .end(function (err, res) {
                    assert.ok(res)
                    assert.isObject(res);
                    done();
                });
        });
    });


    describe('API route for searching public messages', function () {
        it('The api returns a json object of public messages ', function (done) {
            agent.get(HOST + '/search/publicMessages')
                .end(function (err, res) {
                    assert.ok(res)
                    assert.isObject(res);
                    done();
                });
        });
    });


    describe('API route for searching private messages', function () {
        it('The api returns a json object of private messages ', function (done) {
            agent.get(HOST + '/search/privateMessages')
                .end(function (err, res) {
                    assert.ok(res)
                    assert.isObject(res);
                    done();
                });
        });
    });


    describe('API route for posting a post', function () {
        it('The api returns for  posting a post object ', function (done) {
            agent.post(HOST + '/users/')
                .end(function (err, res) {
                    assert.ok(res)
                    assert.isObject(res);
                    done();
                });
        });
    });


    describe('API route for posting a status code', function () {
        it('The api returns for  posting a post object ', function (done) {
            agent.post(HOST + '/users/username/statuscode')
                .end(function (err, res) {
                    assert.ok(res)
                    assert.isObject(res);
                    done();
                });
        });
    });

    describe('API route for posting logout function', function () {
        it('The api returns for  posting a post object ', function (done) {
            agent.get(HOST + '/users/username/logout')
                .end(function (err, res) {
                    assert.ok(res)
                    assert.isObject(res);
                    
                    done();
                });
        });

        describe('API route for getting emergencies ', function () {
            it('The api returns a json object ', function (done) {
                agent.get(HOST + '/emergencies')
                    .end(function (err, res) {
                        assert.ok(res)
                        assert.isObject(res);
                        done();
                    
                    });
            });
        });


        
        describe('API route for getting emergency Details ', function () {
            it('The api returns a json object ', function (done) {
                agent.get(HOST + '/emergencyDetails/')
                    .end(function (err, res) {
                        assert.ok(res)
                        assert.isObject(res);
                        done();
                    
                    });
            });
        });

        describe('API route for getting emergency Details ', function () {
            it('The api returns a json object ', function (done) {
                agent.get(HOST + '/emergencyDetails/')
                    .end(function (err, res) {
                        assert.ok(res)
                        assert.isObject(res);
                        done();
                    
                    });
            });
        });


        
    
    });



});

