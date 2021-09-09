const request = require("request");

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1Ijoiam9zZW1lamlhMTEiLCJhIjoiY2t0NWNjY2xiMDc3NzJubzBkMXh4OTkzayJ9.F54kDamecKHW_3JBTv5MIw&limit=1`;
    request({url, json:true}, (error, { body }) => {
        if(error) {
            callback('The geolocation api fail to connect', undefined);
        }
        else if (body.features.length === 0) { 
            callback('Invalid location', undefined);
        } else {
            callback(undefined, {
                longitud: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name,
                city: body.features[0].text
            });            
        }
    });
}

module.exports = geocode;