/**
 * Author D.Bernard
 */



'use strict'
var ShareStatusController = require('../controllers/ShareStatusController')
const expect = require('chai').expect;
var assert = require('assert')
var username
var statusCode



suite('StatusCrumb Model & ShareStatus Controller ', function () {

    test('#updateUserStatusCode() should update the status code of the specified username', function () {
        username = 'IbareJony'
        statusCode = 'OK'
        ShareStatusController.updateUserStatusCode(username, statusCode, function(err, result) {
            expect(result).to.be.an('object')
        })
    });

});


