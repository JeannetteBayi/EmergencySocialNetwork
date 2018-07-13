
'user strict'

var ER
var erMetaDataJSON



module.exports.getERMetadata = async function getERMetadata(EmergencyRoom, callback) 
{

    var metaData = []
    await EmergencyRoom.getERsDetails().then(async function(ERsData){

        for(var ER of ERsData)
        {

            if(ER.maxPatients > ER.nPatients)
            {
                metaData.push(ER)
            }
        }

        callback(false, metaData)

    })
}


module.exports.saveER =  async function saveER(json_parameters, callback)
{
    /**
     * Former way of creating an EmergencyRoom
     * var theER = new EmergencyRoom(ERData.name, ERData.latitude, ERData.longitude, ERData.services, ERData.maxpatients, ERData.npatients)
     */
    
    json_parameters.EmergencyRoom.setName(json_parameters.ERData.name)
    json_parameters.EmergencyRoom.setLat(json_parameters.ERData.latitude)
    json_parameters.EmergencyRoom.setLng(json_parameters.ERData.longitude)
    json_parameters.EmergencyRoom.setServices(json_parameters.ERData.services)
    json_parameters.EmergencyRoom.setMaxPatients(json_parameters.ERData.maxpatients)
    json_parameters.EmergencyRoom.setNPatients(json_parameters.ERData.npatients)


    json_parameters.EmergencyRoom.save().then(function(response){

        callback(false, response)

    }).catch(function(error){

        callback(true, error)
    })
}


module.exports.removeER = async function removeER(json_parameters, callback)
{
    json_parameters.EmergencyRoom.remove(json_parameters.id).then(function(response){
      
        callback(false, response)

    })
}

