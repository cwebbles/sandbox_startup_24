function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 6,
        center: {lat: 41.8781, lng: -87.6298} // Centered on Chicago
    });

    var directionsService = new google.maps.DirectionsService();
    var directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);
    directionsRenderer.setPanel(document.getElementById('directionsPanel'));

    var request = {
        origin: '40.26119889540056, -111.65974352846648',
        destination: '40.25082423692826, -111.6479512589751',
        waypoints: [
            // Include any waypoints here if necessary
        ],
        provideRouteAlternatives: false,
        travelMode: 'DRIVING', // Keep in mind that TRANSIT mode may not work for very short distances
        drivingOptions: {
            departureTime: new Date(), // Use the current time
            trafficModel: 'pessimistic'
        },
        unitSystem: google.maps.UnitSystem.IMPERIAL
    };
    

    directionsService.route(request, function(response, status) {
        if (status === 'OK') {
            directionsRenderer.setDirections(response);
        } else {
            window.alert('Directions request failed due to ' + status);
        }
    });
}
