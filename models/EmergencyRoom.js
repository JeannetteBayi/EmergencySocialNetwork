
"use strict"

var mongoSchemas = require("../middleware/schemas.js");
var Promise = require('es6-promise').Promise
var emergencyroomSchema = mongoSchemas.EmergencyRoom



class EmergencyRoom{

    constructor()
    {

    }


    setName(theName)
    {
        this.name = theName
    }

    getName()
    {
        return this.name
    }

    setLat(theLat)
    {
        this.latitude = theLat
    }

    getLat()
    {
        return this.latitude
    }

    setLng(theLng)
    {
        this.longitude = theLng
    }

    getLng()
    {
        return this.longitude
    }

    setServices(theServices)
    {
        this.services = theServices
    }

    getServices()
    {
        return this.services
    }


    setMaxPatients(theMaxPatients)
    {
        this.maxPatients = theMaxPatients
    }

    getMaxPatients()
    {
        return this.maxPatients
    }


    setNPatients(theNPatients)
    {
        this.nPatients = theNPatients
    }

    getNPatients()
    {
        return this.nPatients
    }

    toString() {
        return `${this.name}, ${this.latitude}, ${this.longitude}, ${this.services}, ${this.maxPatients}, ${this.nPatients}`;
    }


    save()
    {
        var er = this

        return new Promise(function(resolve, reject) {

            var theEmergencyRoomSchema = new emergencyroomSchema(er)

            theEmergencyRoomSchema.save(function(err, result) {
                if (err)
                {
                    reject(err)
                }
                else
                {
                    resolve(result)
                }
            });
        })
    }



    getERsDetails()
    {
        return new Promise(function(resolve, reject) {
            emergencyroomSchema.find({}).exec(function(err, result){
                resolve(result)
            })
        })
    }


    remove(id)
    {
        return new Promise(function(resolve, reject) {
            emergencyroomSchema.remove({latitude : id.latitude, longitude : id.longitude}).exec(function(err, result){
                resolve(result)
            })
        })
    }

}

module.exports = EmergencyRoom

/**
* Get the list of emergency rooms details
*/



