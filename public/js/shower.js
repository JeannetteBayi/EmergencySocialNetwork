
/**
 * Global variables
 */
var erMetaData
var current_position
var map
var directionsService
var directionsDisplay
var role

function initMap() {

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } 
    else {
        alert('Geolocation is not supported by this browser.')
    }
  
}
    async function showPosition(position) 
    {

        directionsService = new google.maps.DirectionsService;
        directionsDisplay = new google.maps.DirectionsRenderer;
        
        current_position = {lat:position.coords.latitude, lng:position.coords.longitude}; 

        map = new google.maps.Map(document.getElementById('map-container'), {
            zoom: 15,
            center: current_position,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });

        directionsDisplay.setMap(map);

        var marker = new google.maps.Marker({
            position: current_position,
            map: map
        });

        /*Get the list of registered ERs*/
        var erMetaData =  await loadERsMetadata()

        for(var ER in erMetaData)
        {
            var erData = erMetaData[ER]
            //console.log(erData.latitude, erData.longitude)

            var d = calculateDistance(current_position.lat, 
                                erData.latitude, erData.longitude)
        
            var er_content = "<b>ER Name : </b>"+erData.name+"</br></br><b>Services : </b>"+erData.services+"</br></br><b>Max Patients : </b>"+erData.maxPatients+", <b>Patients : </b>"+erData.nPatients+"</br></br><b>Distance : </b>"+d

            var icon = {
                url: "https://cdn4.iconfinder.com/data/icons/medical-red-1/512/map_marker-128.png", // url
                scaledSize: new google.maps.Size(40, 40), // scaled size
                origin: new google.maps.Point(0,0), // origin
                anchor: new google.maps.Point(0, 0) // anchor
            };

            addERMarker({coords:{lat:erData.latitude, lng:erData.longitude}, 
                        content:er_content, 
                        iconImage : icon});
        }



        /**
         * Add map listner
         */
        google.maps.event.addListener(map, 'click', function(event){
            
            var modal = document.getElementById('myModal');

            // Get the <span> element that closes the modal

            var span = document.getElementsByClassName("close")[0];

            span.onclick = function() {
                modal.style.display = "none";
            }

            modal.style.display = "block";

            document.getElementById('latitude').value = event.latLng.lat()
            
            document.getElementById('longitude').value = event.latLng.lng()

        });
    }


    $('#er-form').submit(function(event){

        event.preventDefault();

        var data = $('#er-form').serialize();

        $.post('/emergencyRooms/', data, function(response) 
        {

            if(response == 200)
            {
                alert('Result : ER created successfully!')
                var modal = document.getElementById('myModal');
                modal.style.display = "none";
            }
            else
            {
                alert('Result : '+response)
            }

        }, 'JSON')

        initMap()
    })


    function deleteER(id)
    {
        $.ajax({
            url:'/emergencyRooms/'+JSON.stringify(id),
            method : 'DELETE',
            contentType : 'application/json',
            success : function(data){
                console.log(data)
            }
        })
    }


    function addERMarker(metaData)
    {
        var infoWindow = new google.maps.InfoWindow({
            content : metaData.content
        });


        var marker = new google.maps.Marker({
            position : metaData.coords,
            map : map,
            icon : metaData.iconImage
        });


        marker.addListener('rightclick', function(){
            var answer = confirm("Are sure you want to delete this ER?")
            if (answer) {
                deleteER({latitude:marker.getPosition().lat(), longitude:marker.getPosition().lng()})
            }
        })

        marker.addListener('click',function()
        {
            infoWindow.open(map, marker)

            /**show the route between this ER and the user's current location 
             * the current_position should be defined 
            */
            if(current_position) 
            {

                showRoute({lat:current_position.lat, lng:current_position.lng}, 
                     {lat:marker.getPosition().lat(), lng:marker.getPosition().lng()})
            }
        });
    }

 
    async function loadERsMetadata()
    {
        let result
    
        try 
        {
            result = await $.ajax({
                url: '/emergencyRooms',
                type: 'GET',
                contentType: 'application/json'
            });
            return result;

        } catch (error) {
            console.error(error);
            return error
        }
    }


    function showError(error) 
    {
            switch(error.code) {
                case error.PERMISSION_DENIED:
                    x.innerHTML = "User denied the request for Geolocation."
                    break;
                case error.POSITION_UNAVAILABLE:
                    x.innerHTML = "Location information is unavailable."
                    break;
                case error.TIMEOUT:
                    x.innerHTML = "The request to get user location timed out."
                    break;
                case error.UNKNOWN_ERROR:
                    x.innerHTML = "An unknown error occurred."
                    break;
            }
    }


    /**
     * Calculate the distance in Km between two geographic points
     * @param {*} lat1 
     * @param {*} lon1 
     * @param {*} lat2 
     * @param {*} lon2 
     * Source : http://snipplr.com/view/25479/calculate-distance-between-two-points-with-latitude-and-longitude-coordinates/
     */
    function calculateDistance(origin, destination) 
    {
        var R = 6371; // km (change this constant to get miles)
        var dLat = (destination.latitude - origin.lat) * Math.PI / 180;
        var dLon = (destination.longitude - origin.lng) * Math.PI / 180;
        var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(origin.lat * Math.PI / 180 ) * Math.cos(destination.latitude * Math.PI / 180 ) *
            Math.sin(dLon/2) * Math.sin(dLon/2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        var d = R * c;
        if (d>1) return Math.round(d)+"km";
        else if (d<=1) return Math.round(d*1000)+"m";
        return d;
    }



    function showRoute(start, end) {
        var start = new google.maps.LatLng(start.lat, start.lng);
        var end = new google.maps.LatLng(end.lat, end.lng);
        var request = {
          origin: start,
          destination: end,
          travelMode: document.getElementById('mode').value
        };
        directionsService.route(request, function(response, status) {
          if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
            directionsDisplay.setMap(map);
          } else {
            alert("Directions Request from " + start.toUrlValue(6) + " to " + end.toUrlValue(6) + " failed: " + status);
          }
        });
      }
