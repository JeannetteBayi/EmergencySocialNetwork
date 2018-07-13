var option;
var jsondata = {};
var username;
var socket;
var citizenFriendData = {};
var status;
var groupstatus;
var groupstatus2;
var friendstatus2;
var status2;
var statusmanager;
var statusmanager2;
var friendrelation;

/* 
  When a document loads

*/

$(document).ready(function() {

    /*
     Method to handle log out events
    */

    init();
    userDirectoryList_Handler();

    username = localStorage.username;
    citizenFriendReport(localStorage.username);
    populateFriendList();
    login_logout_Status_observer();

    $('#logout').click(function(e) {
        jsondata.username = username;
        jsondata.password = "";

        $.ajax({
            type: 'GET',
            data: JSON.stringify(jsondata),
            contentType: 'application/json',
            url: '/users/username/logout',
            success: function(response) {
                // For example, filter the response
                console.log('success');
                login_logout_Status_observer();
                localStorage.removeItem('username');
                window.location.href = "/join";
            }
        });
    });


    /*
    Method to handle listing directory 
    */
    $('#userdirectory').click(function(e) {
        userDirectoryList_Handler();
    }); //END OF DOCUMENT

    /*
    Method to handle listing directory 
    */

    $('#btnDirectory').click(function(e) {
        userDirectoryList_Handler();
    }); //END OF DOCUMENT

});



/*
 **Method to be called when listing user directory
 ** this call also updates the local copy on local storage
 */
function userDirectoryList_Handler() {
    $.ajax({
        type: 'GET',
        contentType: 'application/json',
        url: '/users',
        success: function(response) {
            var listUsers = response;
            populateuserdata(response);
            var results = document.getElementById("userlist");
            var lastStatusCode = "";
            if (results != null) {
                for (var i = 0; i < listUsers.length; i++) {
                    if (listUsers[i].onlineStatus == 'Y') {
                        listUsers[i].onlineStatus = 'ONLINE'
                    } else {
                        listUsers[i].onlineStatus = 'OFFLINE'
                    }

                    results.innerHTML += '<p class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray"> <strong class="d-block text-gray-dark class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray" ><img src="../images/user-holder.png" class="mr-2 rounded"><span onclick="javascript:getChatPrivate(' + i + ');" id="' + listUsers[i].username + '"> ' + listUsers[i].username + '</span> <span class="label label-success" style="color:#blue">' + listUsers[i].onlineStatus + ' </span><span class="label label-primary">' + listUsers[i].lastStatusCode + ' </span></strong></p>';
                }
            }
        }
    });
}
/*
log out event handler
*/




function login_logout_Status_observer() {

    var listUsers = JSON.parse(localStorage.getItem('users'));
    if (listUsers != null) {
        socket.on('logout', function(response) {

            for (var i = 0; i < listUsers.length; i++) {
                console.log("user from ls" + listUsers[i].username + " user from response:" + response);
                if (listUsers[i].username == response) {
                    console.log(listUsers[i].username);
                    listUsers[i].onlineStatus = "OFFLINE";
                    console.log("Notification of out going users:updated status:" + listUsers[i].onlineStatus);
                    populateuserdata(listUsers);
                }
            }

        });

        socket.on('login', function(response) {

            console.log(response);
            for (var i = 0; i < listUsers.length; i++) {
                if (listUsers[i].username == response) {
                    listUsers[i].onlineStatus = "ONLINE";
                    console.log("Notification of incoming users: updated user:" + listUsers[i].onlineStatus);
                    populateuserdata(listUsers);

                }
            }
        });

        socket.on('status', function(response) {
            console.log("Notification of health status change");
            alert("Notification:" + response.username + " has jsut changed his health status to" + response.status + " at" + new Date());
            for (var i = 0; i < listUsers.length; i++) {
                if (listUsers[i].username == response.username) {
                    listUsers[i].lastStatusCode = response.status;
                    populateuserdata(listUsers);
                    userDirectoryList_Handler();
                }
            }
        });


    }


}

/*
Populate users
*/

function updateUserList() {
    $.ajax({
        type: 'GET',
        contentType: 'application/json',
        url: '/users',
        success: function(response) {
            var listUsers = response;
            var docs = listUsers;
            console.log("Size:" + response.length);
            console.log("docx:" + docs.length);
            console.log("");
            populateuserdata(response);
            window.location.href = "/chatprivately";
        }
    });

}



function populateFriendList() {
    $.ajax({
        type: 'GET',
        contentType: 'application/json',
        url: '/users',
        success: function(response) {
            var listUsers = response;
            //userDirectoryList_Handler();
            var myfriends = JSON.parse(localStorage.getItem('friendrepo'));
            var results = document.getElementById("userlist1");

            var lastStatusCode = "";
            if (results != null) {

                var trackrelation = false;

                for (var i = 0; i < listUsers.length; i++) {
                    if (listUsers[i].username != localStorage.username) {
                        friendrelation = false;
                        trackrelation = false;
                        if (listUsers[i].onlineStatus == 'Y') {
                            listUsers[i].onlineStatus = 'ONLINE'
                        } else {
                            listUsers[i].onlineStatus = 'OFFLINE'
                        }

                        for (var k = 0; k < myfriends.length; k++) {

                            //tracking relation 
                            if (myfriends[k].ownerUser == listUsers[i].username || myfriends[k].joinUser == listUsers[i].username) {

                                if (myfriends[k].ownerUser == listUsers[i].username) { friendrelation = true; }

                                trackrelation = true;
                                if (myfriends[k].groupStatus == "approved" && myfriends[k].friendStatus == "approved") {

                                    results.innerHTML += '<p class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray"> <strong class="d-block text-gray-dark class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray" ><img src="../images/user-holder.png" class="mr-2 rounded"><span > ' + listUsers[i].username + '</span> <span class="label label-success" style="color:#blue">' + listUsers[i].onlineStatus + ' </span><span class="label label-primary">' + listUsers[i].lastStatusCode + "" + ' </span></strong>' + " Status:" + " Group Friend" + '<span id="InviteUser" id="' + " friend_" + listUsers[i].username + '" style="color:blue"><u>' + "Friend Group Since:" + myfriends[k].lastupdate + '</u></span></p>';

                                } else if (myfriends[k].groupStatus == "enabled" && myfriends[k].friendStatus == "approved") {

                                    if (!friendrelation) {
                                        results.innerHTML += '<p class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray"> <strong class="d-block text-gray-dark class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray" ><img src="../images/user-holder.png" class="mr-2 rounded"><span > ' + listUsers[i].username + '</span> <span class="label label-success" style="color:#blue">' + listUsers[i].onlineStatus + ' </span><span class="label label-primary">' + listUsers[i].lastStatusCode + "" + ' </span></strong>' + " Status:" + " Friend" + '<span id="InviteUser" onclick="javascript:updatestatusingroup(' + i + ',' + friendrelation + ')" id="' + " friend4_" + listUsers[i].username + '" style="color:blue"><u>' + "   " + 'Invite As Group Friend</u></span></p>';
                                    } else {
                                        results.innerHTML += '<p class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray"> <strong class="d-block text-gray-dark class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray" ><img src="../images/user-holder.png" class="mr-2 rounded"><span > ' + listUsers[i].username + '</span> <span class="label label-success" style="color:#blue">' + listUsers[i].onlineStatus + ' </span><span class="label label-primary">' + listUsers[i].lastStatusCode + "" + ' </span></strong>' + " Status:" + " Approved Friend" + '<span></p>';
                                    }


                                } else if (myfriends[k].friendStatus == "denied" && myfriends[k].groupStatus == "disabled") {

                                    //message
                                    results.innerHTML += '<p class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray"> <strong class="d-block text-gray-dark class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray" ><img src="../images/user-holder.png" class="mr-2 rounded"><span > ' + listUsers[i].username + '</span> <span class="label label-success" style="color:#blue">' + listUsers[i].onlineStatus + ' </span><span class="label label-primary">' + listUsers[i].lastStatusCode + "" + ' </span></strong>' + " Status:" + " Denied Friend" + '<span id="InviteUser" id="' + " friend_" + listUsers[i].username + '" style="color:blue"><u>' + "Denied friend request on:" + myfriends[k].lastupdate + '</u></span></p>';

                                } else if (myfriends[k].friendStatus == "approved" && myfriends[k].groupStatus == "denied") {

                                    results.innerHTML += '<p class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray"> <strong class="d-block text-gray-dark class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray" ><img src="../images/user-holder.png" class="mr-2 rounded"><span > ' + listUsers[i].username + '</span> <span class="label label-success" style="color:#blue">' + listUsers[i].onlineStatus + ' </span><span class="label label-primary">' + listUsers[i].lastStatusCode + "" + ' </span></strong>' + " Status:" + " Friend" + '<span id="InviteUser" id="' + " friend_" + listUsers[i].username + '" style="color:blue"><u>' + "Denied to join group on :" + myfriends[k].lastupdate + '</u></span></p>';
                                } else if (myfriends[k].friendStatus == "approved" && myfriends[k].groupStatus == "pending") {
                                    //Request toapprove  group

                                    if (!friendrelation) {
                                        results.innerHTML += '<p class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray"> <strong class="d-block text-gray-dark class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray" ><img src="../images/user-holder.png" class="mr-2 rounded"><span > ' + listUsers[i].username + '</span> <span class="label label-success" style="color:#blue">' + listUsers[i].onlineStatus + ' </span><span class="label label-primary">' + listUsers[i].lastStatusCode + "" + ' </span></strong>' + " Status:" + " Pending Group Request" + '<span></p>';
                                    } else {
                                        results.innerHTML += '<p class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray"> <strong class="d-block text-gray-dark class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray" ><img src="../images/user-holder.png" class="mr-2 rounded"><span > ' + listUsers[i].username + '</span> <span class="label label-success" style="color:#blue">' + listUsers[i].onlineStatus + ' </span><span class="label label-primary">' + listUsers[i].lastStatusCode + "" + ' </span></strong>' + " Status:" + " Pending Friend to join group" + '<span id="InviteUser6" onclick="javascript:ApproveGroup(' + i + ',' + friendrelation + ')" id="' + " friend6_" + listUsers[i].username + '" style="color:blue"><u>' + "    " + 'Approve</u></span><span onclick="javascript:DenyGroup(' + i + ',' + friendrelation + ');" id="' + " friend666_" + listUsers[i].username + '" style="color:blue">' + "            " + '<u>Deny</u></span></p>';
                                    }

                                } else if (myfriends[k].friendStatus == "pending" && myfriends[k].groupStatus == "disabled") {
                                    //Request to approve a friend 

                                    if (!friendrelation) {
                                        //just watch

                                        results.innerHTML += '<p class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray"> <strong class="d-block text-gray-dark class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray" ><img src="../images/user-holder.png" class="mr-2 rounded"><span > ' + listUsers[i].username + '</span> <span class="label label-success" style="color:#blue">' + listUsers[i].onlineStatus + ' </span><span class="label label-primary">' + listUsers[i].lastStatusCode + "" + ' </span></strong>' + " Status:" + " Pending Friend Request" + '<span></p>';
                                    } else {
                                        results.innerHTML += '<p class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray"> <strong class="d-block text-gray-dark class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray" ><img src="../images/user-holder.png" class="mr-2 rounded"><span > ' + listUsers[i].username + '</span> <span class="label label-success" style="color:#blue">' + listUsers[i].onlineStatus + ' </span><span class="label label-primary">' + listUsers[i].lastStatusCode + "" + ' </span></strong>' + " Status:" + " Pending to be Friend" + '<span id="InviteUser7" onclick="javascript:ApproveFriend(' + i + ',' + friendrelation + ')" id="' + " friend7_" + listUsers[i].username + '" style="color:blue"><u>' + "    " + 'Approve</u></span><span onclick="javascript:DenyFriend(' + i + ',' + friendrelation + ');" id="' + " friend77_" + listUsers[i].username + '" style="color:blue">' + "            " + '<u>Deny</u></span></p>';

                                    }


                                } else {


                                    alert("Similarity 8  Group" + myfriends[k].groupStatus + "   Frined:" + myfriends[k].friendStatus)

                                }



                            }

                        }
                        if (trackrelation == false) {

                            results.innerHTML += '<p class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray"> <strong class="d-block text-gray-dark class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray" ><img src="../images/user-holder.png" class="mr-2 rounded"><span > ' + listUsers[i].username + '</span> <span class="label label-success" style="color:#blue">' + listUsers[i].onlineStatus + ' </span><span class="label label-primary">' + listUsers[i].lastStatusCode + "" + ' </span></strong>' + "   " + '<span id="InviteUser" onclick="javascript:getFriendId(' + i + ')" id="' + " friend8_" + listUsers[i].username + '" style="color:blue"><u>Invite as Friend</u></span></p>';
                        }


                    }

                }
            }
            //citizenFriendReport("gilbert");
        }
    });
}





function myFunction(id) {

    alert("Selected:" + id);
}