const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=f75501c6933d9ea3acc21dad478fcbe8&query=' + latitude + ',' + longitude +'&units=f'
    request({ url, json:true}, (error, { body }) => {
        if(error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.error) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees Fahrenheit out. There is a ' + body.current.precip + '% chance of rain.')
        }
    })
}

module.exports = forecast