const { json } = require('express');
const fs = require('fs');
const path = require('path');

exports.getRouteData = function (route_name) {

    let route_data;

    // Read the content of the JSON file
    fs.readFile('~/../data/route.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading the JSON file:', err);
            return;
        }

        // Parse the JSON content
        try {
            const json_data = JSON.parse(data);
            console.log('Parsed JSON data:', route_data);

        } catch (err) {
            console.error('Error parsing JSON string:', err);
        }

        return json_data.byu_routes.filter(route => route.route_name === route_name);
    });

};
