var data = {};

$(document).ready(function() {

    $('#btnUpdatestatus').click(function(e) {
        var status_okey = document.getElementById('statusOkey').checked;
        var status_help = document.getElementById('statusHelp').checked;
        var status_Danger = document.getElementById('statusDanger').checked;

        var element = document.getElementById("mySelect");
        var elementValue = element.value;
        //alert(elementValue);


        if (status_okey == false && status_Danger == false && status_help == false) {

            alert("Please you have to choose to select on option");
            return false;

        } else {
            if (status_Danger == true && elementValue == "default") { alert("please specify your emergency type"); return false }
            data.status = $("input[type='radio'][name='group100']:checked").val();
            if (status_okey == true) { data.reason = "default" }
            if (status_help == true) { data.reason = "default" }
            if (status_Danger == true) { data.reason = elementValue }
            data.username = localStorage.username;
            alert("Selected value:" + data.status + "  username:" + data.username + "   status:" + data.status);
        }

        $.ajax({
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            url: '/users/username/statuscode',
            success: function(data) {
                console.log('success');
            },
            error: function(error) {
                console.log(error);
            }
        });

    });



});

function answers() {


}