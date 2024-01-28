var directionsService;
var directionsRenderer;
var map;

const STARTING = '40.26228, -111.65706';

const WYVIEW = '40.26093, -111.65990';

const MOA = '40.25093, -111.64749';

const BIKE_RACK = '40.25242, -111.65084';

function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 6,
        center: { lat: 41.8781, lng: -87.6298 },
        disableDefaultUI: true,
    });

    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);
}

document.addEventListener('DOMContentLoaded', function () {
    eventListeners();
})

function eventListeners() {
    const testButton = document.getElementById('test');
    testButton.addEventListener('click', () => {
        routeToClosestByuStop();
    });
    const bikeButton = document.getElementById('test2');
    bikeButton.addEventListener('click', () => {
        routeToBikeRack();
    });
    return;
}

async function routeToClosestByuStop() {
    var request = {
        origin: STARTING,
        destination: MOA,
        waypoints: [
            { location: new google.maps.LatLng(40.26093, -111.65990), stopover: false }
        ],
        provideRouteAlternatives: false,
        travelMode: 'WALKING', // Keep in mind that TRANSIT mode may not work for very short distances
        drivingOptions: {
            departureTime: new Date(), // Use the current time
            trafficModel: 'pessimistic'
        },
        unitSystem: google.maps.UnitSystem.IMPERIAL
    };

    let routeResponse = await directionsService.route(request, function (response, status) {
        if (status === 'OK') {
            console.log(response);
            directionsRenderer.setDirections(response);
            return response // TODO: What do we want to do with the response
        } else {
            window.alert('Directions request failed due to ' + status);
        }
    });

    console.log('Response:', routeResponse);
    console.log('Route:', routeResponse.routes[0]);
    console.log('Leg:', routeResponse.routes[0].legs[0]);


    let time = getTime();
    routeResponse.routes[0].legs[0].duration.value = time;

    const textTime = Math.floor(time / 60) + " mins";
    routeResponse.routes[0].legs[0].duration.text = textTime;

    return routeResponse;
}

function getTime() {
    var walk_request = {
        origin: STARTING,
        destination: WYVIEW,
        waypoints: [],
        provideRouteAlternatives: false,
        travelMode: 'WALKING', // Keep in mind that TRANSIT mode may not work for very short distances
        drivingOptions: {
            departureTime: new Date(), // Use the current time
            trafficModel: 'pessimistic'
        },
        unitSystem: google.maps.UnitSystem.IMPERIAL
    };

    let total_time = 0;

    directionsService.route(walk_request, function (response, status) {
        if (status === 'OK') {
            total_time += response[0].legs[0].duration.value;
        } else {
            window.alert('Directions request failed due to ' + status);
        }
    });

    var drive_request = {
        origin: WYVIEW,
        destination: MOA,
        waypoints: [],
        provideRouteAlternatives: false,
        travelMode: 'DRIVING', // Keep in mind that TRANSIT mode may not work for very short distances
        drivingOptions: {
            departureTime: new Date(), // Use the current time
            trafficModel: 'pessimistic'
        },
        unitSystem: google.maps.UnitSystem.IMPERIAL
    };

    directionsService.route(drive_request, function (response, status) {
        if (status === 'OK') {
            total_time += response[0].legs[0].duration.value;
        } else {
            window.alert('Directions request failed due to ' + status);
        }
    });

    return total_time;
}

function routeToBikeRack() {
    var bike_request = {
        origin: STARTING,
        destination: BIKE_RACK,
        waypoints: [],
        provideRouteAlternatives: false,
        travelMode: 'BICYCLING', // Keep in mind that TRANSIT mode may not work for very short distances
        drivingOptions: {
            departureTime: new Date(), // Use the current time
            trafficModel: 'pessimistic'
        },
        unitSystem: google.maps.UnitSystem.IMPERIAL
    };

    let res = null;

    directionsService.route(bike_request, function (response, status) {
        if (status === 'OK') {
            res = response
            directionsRenderer.setDirections(response); // TODO: What do we want to do with the responses
        } else {
            window.alert('Directions request failed due to ' + status);
        }
    });
}
