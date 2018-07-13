var option;
var jsondata = {};
var username;
var socket;

/* To trigger both public and private messages*/

$("#btn_enable").click(function() {

    alert("Getting there");
    enableEmergencyGroup();

});

$("#btn_chat").click(function() {
    alert("Group chat")
    window.location.href = "groupchatpage";
});

$("#btn_map").click(function() {
    alert("User location")
    window.location.href = "userlocationpage";
});

$("#btn_emergencysms").click(function() {
    alert("Message sms")
    window.location.href = "groupfriendemergencymessagepage";
});

/*    Enable emergency group */
function enableEmergencyGroup() {

    jsondata.username = localStorage.username;

    $.ajax({
        type: 'POST',
        data: JSON.stringify(jsondata),
        contentType: 'application/json',
        url: '/groups',
        success: function(response) {
            //For example, filter the response
            //console.log('success');
            if (response == "200") {
                alert("Your Group Has been Enabled Now You Can Add/Invite Your Friends:" + response);
                window.location.href = "/invitingfriendpage";
            } else {
                alert("Failure To enable the Group: Try again again:" + response);
            }


        }
    });


}


function notificationdetails() {
    window.location.href = "emergencydetails";

}