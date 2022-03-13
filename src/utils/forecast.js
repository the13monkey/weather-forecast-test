const request = require('postman-request')

const forecast = (lat, long, callback) => {

    const url = `http://api.weatherstack.com/current?access_key=af7d4e4543c05b58f7078637cafd66e7&query=${lat},${long}&units=f`

    request({url, json: true}, (error, {body} = {}) => {
        if (!error) {
            callback(undefined, {
                degree: body.current.temperature,
                feellike: body.current.feelslike,
                description: body.current.weather_descriptions[0]
            })
        } else {
            callback('Unable to connect to forecast service', undefined)
        }
    })

}

module.exports = forecast 