"use strict"

var mongoSchemas = require("../middleware/schemas.js");

var Promise = require('es6-promise').Promise
var emergencySchema = mongoSchemas.Emergency;

class Emergency {

    /*
           Class constructor: to initialize all user attribute for each crated on object

    */
    constructor(title, neededItems, description, postedAt) {
        this.title = title;
        this.neededItems = neededItems;
        this.description = description
        this.postedAt = postedAt;

    }


    getTitle() {
        return this.title
    }

    setTIle(title) {
        this.title = title;
    }

    getNeededItems() {
        return this.neededItems
    }

    setNeededItems(neededItems) {
        return this.neededItems = neededItems;
    }

    getPostedAt() {
        return this.postedAt;
    }

    setPostedAt(postedAt) {
        return this.postedAt = postedAt;
    }

    getDescription() {
        return this.description;
    }

    setDescription(description) {
        return this.description = description;
    }

    toString() {
        return `${this.title}, ${this.neededItems}, ${this.description},   ${this.postedAt}`;
    }

    /** _______________________________________Getting  all registered emergencies________________________
    *  @param  * 
    * @returns 
    * * @return 
    * 
    */
    getEmergencies() {
        return new Promise(function (resolve, reject) {
            emergencySchema.find({"neededItems.quantity" : { $gt: 0 } }).sort({ postedAt: -1 }).exec(function (err, emergencyDetails) {
                if (err) reject(err)
                resolve(emergencyDetails)
            })
        });
    }



    /** _______________________________________Getting  emergency by Id________________________
    *  @param   emergencyId* 
    * @returns 
    * * @return 
    * 
    */
    getEmergencyById(emergencyId) {
        return new Promise(function (resolve, reject) {
            emergencySchema.find( {"_id":emergencyId} ).sort({ postedAt: -1 }).exec(function (err, emergencyDetails) {
                if (err) reject(err)
                resolve(emergencyDetails)
            })
        });
    }
   



    /** ____________________________________registering emergencies_________________________
   *  @param  * 
   * @returns result
   * * @return error
   */
    saveEmergency() {
        var emergency = this
        return new Promise(function (resolve, reject) {
            var theEmergencySchema = new emergencySchema(emergency)
            theEmergencySchema.save(function (error, result) {
                if (error) reject(error)
                resolve(result)
            });
        });
    }


     /** ____________________________________Donating to an emergency given the emergency Id and amount of money to donate_________________________
   *  @param  emergencyId * 
   * @param  moneyTodonate *
   * @returns emergencyData
   * * @return error
   */
    async donateToEmergency(emergencyId, moneyTodonate) {
        //getting current valued of money needed to raise
        var currentMoney = 0;
        await this.getCurrentNeededMoney(emergencyId).then(function (emergencyData) {
            currentMoney = emergencyData[0].neededItems.quantity
            var newValueOfNeededMoneyy = currentMoney - moneyTodonate
            return new Promise(function (resolve, reject) {
                emergencySchema.updateOne({ "_id": emergencyId }, { $set: { "neededItems.quantity": newValueOfNeededMoneyy } }).exec(function (err, emergencyUpdate) {
                    if (err) reject(err)
                    resolve(emergencyUpdate)
                });
            })
        });
    }


      /** ___________________________________Getting current value of money needed so far, based on what have been received_________________________
   *  @param  emergencyId * 
   * @returns result
   * * @return error
   */
   async getCurrentNeededMoney(emergencyId) {
        return new Promise(function (resolve, reject) {
            emergencySchema.find({ "_id": emergencyId }).exec(function (err, result) {
                if (err) reject(err)
                resolve(result)
            })
        });

    }
}
module.exports = Emergency


