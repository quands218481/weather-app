const request = require('request')

function forecast(latitude, longitude, callback) {
    let url = `http://api.weatherstack.com/current?access_key=d68c8e2ae8e01c467dfcea69a3be0478&query=${latitude},${longitude}`
    let chanceOfRain = 'Chance of rain'
    //body là 1 thuộc tính của res, tham số thứ 2 của cb k nhất thiết phải là obj
    request({ url, json: true }, (error, { body = ''}) => {
        if(error) {
            callback('Unable to connect to weather service!!', undefined)
        }else if(body.error) {
            callback('Can not find the weather of this location!!', undefined)
        }else {
            callback(undefined,
                `Temperature: ${body.current.temperature}. Chance of rain: ${body.current.precip} %`
            )
        }
    })
}

module.exports = forecast