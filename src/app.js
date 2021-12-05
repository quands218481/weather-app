const path = require('path')
const express = require('express')
const hbs = require('hbs')
const app = express()
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

//Define paths for Express config
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
//setup hbs engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(path.join(__dirname, '../public')))

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: '[Quands]'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Quands'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Quands'
    })
})
app.get('/weather', (req, res) => {
    let address = req.query.address
    if(!address) {
       return res.send({
            error: 'You must provide an address'
        })
    }
    geocode(address , (error, { latitude, longitude, location } = {}) => {
        if(error) {
            return res.send({error})
         }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({error})
            }
            res.send({
                location,
                weather: forecastData
            })
        })
    })
})
app.get('help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Quands',
        errorMess: 'Help article not found.'
    })
})
app.get('/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Quands',
        errorMess: 'Page not found.'
    })
})




app.listen(3000, () => {
    console.log(`Server is up on port 3000`)
})