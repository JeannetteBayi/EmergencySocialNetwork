/**
 * Author MN and JM
 */

 
'use strict'

const expect = require('chai').expect;
var assert = require('assert')
var escalateHitWord = require('../models/escalateHitWord.js')
var escalateHitWordController = require('../controllers/escalateEmergencyKeywordController.js')
var thisApp = require('../app.js');



suite('escalate HitWord Model & Escalate Message Controller Test', function(){
      
    

    test('escalate HitWord  Model Should create an object',  function(done){
      
      var receiver = "Jeannette";
      var details = "provide more tests";
      var postedAt = new Date();

      var newescalateHitWord = new escalateHitWord(receiver, details, postedAt)
      expect(receiver).to.be.equal(newescalateHitWord.getReceiver())
      expect(details).to.be.equal(newescalateHitWord.getDetails())
      expect(postedAt).to.be.equal(newescalateHitWord.getPostedAt())
      thisApp.socketio.close();
      done()

      });
      


});

