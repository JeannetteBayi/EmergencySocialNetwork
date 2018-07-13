//connect the socket
var host = location.origin.replace(/^http/, 'ws');
var socket = io.connect(host)
var currentDate = new Date().toLocaleString();
var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
var weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
var trackdate;

$(document).ready(function () {

    $("#postMessage").click(function () {
        sendPublicMessage();

    });
    $("#postGroupMessage").click(function () {
        sendGroupMessage();

    });

    $('#postPrivatetMessage').click(function () {
        //console.log('clicked');
        sendPrivateMessage();
    });

    //registering an emergency situation
    $('#registerEmergency').click(function () {
        registerEmergency();
    });

    // adding broadcast messages when an annoucement is posted.
    $("#postAnnouncement").click(function () {
        sendAnnouncements();
    });
    //end post announcement

    socket.on('NewPublicMessage', function (publicMessage) {
        var index = 0;
        var data = publicMessage['MessageObject'];
        var status = publicMessage['AuthorStatusCode'];
        trackdate = new Date(data.postedAt);
        showmessages.innerHTML += '<div class="media-body text-muted pt-3"> <p  class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray"> <strong class="d-block text-gray-dark class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray" ><img src="../images/user-holder.png" class="mr-2 rounded"><span  id="' + data.author + '"> <strong>@' + data.author + " | " + publicMessage.AuthorStatusCode[index].statusCode + " | " + data.messageType + " |" + weekdays[trackdate.getDay()] + " " + months[trackdate.getMonth()] + " " + trackdate.getDate() + " " + trackdate.getFullYear() + " " + trackdate.getHours() + ":" + trackdate.getMinutes() + ":" + trackdate.getSeconds() + '<br/>' + data.content + '</strong> <br/></span> <span class="label label-success" style="color:#blue"> </span> <span class="label label-success" style="color:#blue"  style="text-align: right"></span></strong></strong> </p></div>';

    });

    socket.on('NewGroupMessage', function (publicMessage) {

        var index = 0;
        var data = publicMessage['MessageObject'];
        var status = publicMessage['AuthorStatusCode'];
        trackdate = new Date(data.postedAt);
        showgroupmessages.innerHTML += '<div class="media-body text-muted pt-3"> <p  class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray"> <strong class="d-block text-gray-dark class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray" ><img src="../images/user-holder.png" class="mr-2 rounded"><span  id="' + data.author + '"> <strong>@' + data.author + " | " + publicMessage.AuthorStatusCode[index].statusCode + " | " + data.messageType + " |" + weekdays[trackdate.getDay()] + " " + months[trackdate.getMonth()] + " " + trackdate.getDate() + " " + trackdate.getFullYear() + " " + trackdate.getHours() + ":" + trackdate.getMinutes() + ":" + trackdate.getSeconds() + '<br/>' + data.content + '</strong> <br/></span> <span class="label label-success" style="color:#blue"> </span> <span class="label label-success" style="color:#blue"  style="text-align: right"></span></strong></strong> </p></div>';

    });
    socket.on('NewPrivateMessage', function (data) {
        alert("You have a new private meesage from:" + data.author);
        latestPrivateMessages.innerHTML += '<div class="media text-muted pt-3"><img src="../images/user-holder.png" alt="" class="mr-2 rounded"> <p class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray"> <strong class="d-block text-gray-dark">@' + data.author + " " + data.messageType + '</strong>' + data.postedAt + '<br/>' + data.content + '</p></div>';

    });

    socket.on('NewAnnouncement', function (Announcement) {
        trackdate = new Date(Announcement.postedAt);
        showannouncements.innerHTML += '<div class="media text-muted pt-3"><img src="../images/user-holder.png" alt="" class="mr-2 rounded"> <p class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray"> <strong class="d-block text-gray-dark">@' + Announcement.author + "  " + weekdays[trackdate.getDay()] + " " + months[trackdate.getMonth()] + " " + trackdate.getDate() + " " + trackdate.getFullYear() + " " + trackdate.getHours() + ":" + trackdate.getMinutes() + ":" + trackdate.getSeconds() + '</strong>Subject:' + Announcement.title + '<br/>' + Announcement.content + '</p></div>';

    });
});


function registerEmergency() {

    var validBoolean = validateEmergency();
    var emergencyTitle = document.getElementById('emergencyTitle');
    var itemName = document.getElementById('itemName');
    var quantity = document.getElementById('quantity');
    var Emergencydescription = document.getElementById('description');
    if (validBoolean) {
        var data = {};
        data.title = emergencyTitle.value;
        data.description = Emergencydescription.value;
        data.name = itemName.value;
        data.quantity = quantity.value;
        $.post('/emergencies/', data, function (response) {
        }, 'JSON');

        var resultsdiv = document.getElementById("thankRegistor");
        resultsdiv.innerHTML = '<div class="media-body text-muted pt-3"> <p  class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray"> <strong class="d-block text-gray-dark class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray" > </p><p>DONATION COORDINATION FOR EMERGENY<p>STUATION RECORDED SUCCESSFULLY</p></></div>';
    }
}

function sendPublicMessage() {
    var message = document.getElementById('messageArea');
    var username = document.getElementById('username');
    var messageType = 'public';
    //push the data to the array
    var data = {};
    data.content = message.value;
    data.author = localStorage.username;
    data.target = 'public';


    data.postedAt = currentDate;
    data.messageType = messageType;

    //make sure the message field is empty
    message.value = " ";

    $.post('/messages/', data, function (response) {

    }, 'JSON');


}

function sendGroupMessage() {
    var message = document.getElementById('messageArea');
    var username = document.getElementById('username');
    var messageType = 'public'
    //push the data to the array
    var data = {};
    data.content = message.value;
    data.author = localStorage.username;
    data.target = 'group';


    data.postedAt = currentDate;
    data.messageType = messageType;

    //make sure the message field is empty
    message.value = " ";

    $.post('/messages/', data, function (response) {

    }, 'JSON');


}

function sendPrivateMessage() {
    let author = localStorage.username;

    let target = localStorage.target;

    let content = $('#messagePrivateArea').val();
    let messageType = "private";

    let data = {
        content: content,
        author: author,
        target: target,
        target: target,
        postedAt: currentDate,
        messageType: messageType
    };

    $.post('/messages/', data, function (response) {

    }, 'JSON');

    socket.emit('NewPrivateMessage', data);

    var resultsdiv = document.getElementById("latestPrivateMessages");
    resultsdiv.innerHTML += '<div class="media-body text-muted pt-3"> <p  class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray"> <strong class="d-block text-gray-dark class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray" ><img src="../images/user-holder.png" class="mr-2 rounded"><span  id="' + data.author + '"> <strong>' + data.author + '</strong> <br/></span> <span class="label label-success" style="color:#blue">' + data.content + ' </span> <span class="label label-success" style="color:#blue"  style="text-align: right">' + data.postedAt + ' </span></strong></strong> </p></div>';
}

function sendAnnouncements() {

    var announcement = document.getElementById('announcementArea');
    var coordinator = document.getElementById('coordinator');
    var AnnouncementTitle = document.getElementById('AnnouncementTitle');
    var messageType = 'announcement';
    var postedAt = currentDate;

    //push the form elements into a data array to be passed on to the url
    var data = {};
    data.content = announcement.value;
    data.author = localStorage.username;
    data.title = AnnouncementTitle.value;
    data.messageType = messageType;

    if (announcement.value == " ") {
        alert("Please Enter Announcement")
    } else {
        //make sure the message field is empty after pressing send message
        announcement.value = " ";
        AnnouncementTitle.value = " ";

        $.post('/announcements', data, function (response) {

        }, 'JSON');

    }
}


$(".allUser").click(function () {
    var users = document.getElementsByClassName("allUser")
    for (var i = 0; i < users.length; i++) {
        users[i].addEventListener("click", function () {
            $(this).slideToggle();
        })
    }
});



// If the username is valid
var username = localStorage.username;
if (username) {
    // Tell the server your username
    socket.emit('add user', username);
}

// Whenever the server emits 'user joined', log it in the chat body
socket.on('user joined', function (data) {

});

// Whenever the server emits 'user left', log it in the chat body
socket.on('user left', function (data) {

});



function registerEmergency() {

    var validBoolean = validateEmergency();
    var emergencyTitle = document.getElementById('emergencyTitle');
    var itemName = document.getElementById('itemName');
    var quantity = document.getElementById('quantity');
    var Emergencydescription = document.getElementById('description');
    if (validBoolean) {
        var data = {};
        data.title = emergencyTitle.value;
        data.description = Emergencydescription.value;
        data.name = itemName.value;
        data.quantity = quantity.value;
        $.post('/emergencies/', data, function (response) {
        }, 'JSON');

        var resultsdiv = document.getElementById("thankRegistor");
        resultsdiv.innerHTML = '<div class="media-body text-muted pt-3"> <p  class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray"> <strong class="d-block text-gray-dark class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray" > </p><p>DONATION COORDINATION FOR EMERGENY<p>STUATION RECORDED SUCCESSFULLY</p></></div>';
    }
}