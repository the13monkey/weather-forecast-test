const request = require('postman-request')

const geocode = (address, callback) => {

    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoibXltZWFscHJlcHBsYW5uZXIiLCJhIjoiY2t6dzdwMjJ1NGVuMjJvcGF4YzFwdTc5NCJ9.En0TsXTQCLz-vSjTx1G5pg&limit=1`

    request({url, json: true}, (error, {body}) => {
        if (!error) {
            if ( body.features.length === 0 ) {
                callback('Unable to find matching result', undefined)
            } else {
                callback(undefined, {
                    latitude: body.features[0].center[1],
                    longitude: body.features[0].center[0],
                    location: body.features[0].place_name
                })
            }
        } else {
            callback('Unable to connect to location services', undefined)
        }
    })
}

module.exports = geocode