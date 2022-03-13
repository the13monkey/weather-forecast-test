const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()

// Define paths for Express config
const rootUrl = path.join(__dirname, '../public')
const viewsUrl = path.join(__dirname, '../templates/views')
const partialsUrl = path.join(__dirname, '../templates/partials')

// Setup handlebars view engine and views location
app.set('view engine', 'hbs') // Set Express setting => set up handlebars JS (similar to React JS) and do dynamic pages with templating
app.set('views', viewsUrl)
hbs.registerPartials(partialsUrl)

// Setup static directory to serve
app.use( express.static( rootUrl ) ) // A way to customize your server, now we're going to customize it to serve up that folder

// Use app's get method for routes 
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather Service',
        author: 'Dinah'
    })
}) // Use .render to render a view 

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        author: 'Dinah'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'Contact our 24/7 support team for help.',
        author: 'Dinah'
    })
})

app.get('/weather', (req, res) => {
    const location = req.query.address

    if (!location) {
        return res.send({
            error: 'Please provide a valid address.'
        })
    }
    
    geocode(location, (err, {latitude, longitude, location} = {}) => {
        if (err) {
            return res.send({
                error: err
            })
        }

        forecast(latitude, longitude, (err, {description, degree, feellike}) => {

            if (err) {
                return res.send({
                    error: err
                })
            }

            const forecastData = `The weather forcast for ${location} is ${description}. It is currently ${degree} degrees out. It feels like ${feellike} degrees out.`

            res.send({
                forecast: forecastData,
                location: location,
                address: location
            })
        })
    })

})

app.get('/help/*', (req, res) => {
    res.render('404', {
        error: 'Help article not found.',
        title: '404 - Article',
        author: 'Dinah'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        error: 'Page not found.',
        title: '404',
        author: 'Dinah'
    })
})

// Start server up 
app.listen(3000, () => {
    console.log('Server is running on port 3000')
})