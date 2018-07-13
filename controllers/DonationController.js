var Emergency = require('../models/Emergency.js');



/** ____________________________________registering emergencies_________________________
* @param  title * 
* @param  name * 
 * @param  quantity * 
* @param  description *
* @param  callback * 
* @returns callback(false, emergencyData)
* @returns  callback(true, err) *
*/

module.exports.saveEmergency = async function saveEmergency(title, name, quantity, description, callback) {
    var timeStamp = new Date()
    var item = {
        name: name,
        quantity: quantity   
    }
    var emergency = new Emergency(title, item, description, timeStamp);
    emergency.saveEmergency().then(function (emergencyData) {
        callback(false, emergencyData)
    }).catch((err) => {
        console.log("SAVING EMERGENCY ERROR ERROR : \n" + err)
        callback(true, err)

    });
}

/** ____________________________________get emergencies_________________________
* @param  callback * 
* @returns callback(false, emergencyData)
* @returns  callback(true, err) *
*/

module.exports.getEmergencies = async function getEmergencies(callback) {
    var emergency = new Emergency();
    emergency.getEmergencies().then(function (emergencies) {
        console.log(emergencies);
        callback(false, emergencies)
    }).catch((err) => {
        console.log("GETTING EMERGENCIES ERROR : \n" + err)
        callback(true, err)
    });
}


/** ____________________________________getting emergency by ID_________________________
* @param  caemergencyIdllback * 
 @param  callback *
* @returns callback(false, emergencyData)
* @returns  callback(true, err) *
*/
module.exports.getEmergencyById = async function getEmergencies(emergencyId, callback) {
        var emergency = new Emergency();
        emergency.getEmergencyById(emergencyId).then(function (emergency) {
            console.log(emergency);
            callback(false, emergency)
        }).catch((err) => {
            console.log("GETTING EMERGENCY ERROR : \n" + err)
            callback(true, err)
    
        });
    }



/** ____________________________________donating to emergency_________________________
* @param  emergencyId * 
 @param  moneyTodonate *
@returns callback(false, emergencyData)
@returns  callback(true, err) *
*/

module.exports.donateToEmergency = async function donateToEmergency( emergencyId, moneyTodonate,callback) {
    var emergency = new Emergency();
    emergency.donateToEmergency(emergencyId, moneyTodonate ).then(function (emergency) {
        callback(false, emergency)
    }).catch((err) => {
        console.log(" DONATING TPO EMERGENCY ERROR : \n" + err)
        callback(true, err)

    });
}

