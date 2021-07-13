const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPaths = path.join(__dirname, '../templates/partials')

// setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPaths)

// setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Koval'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helptext: 'help text',
        title: 'Help',
        name: 'Koval'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Koval'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide a search address'
        })
    }

    geocode(req.query.address, (error, { location, latitude, longitude } = {}) => {
        if(error) {
            res.send({ error })
        }

        forecast(latitude, longitude,(error, forecastData) => {
            if(error) {
                res.send({ error })
            }

            res.send({
                location,
                forecast: forecastData,
                address: req.query.address
            })
        })
    })

    // res.send({
    //     forecast: 'Sunny',
    //     location: 'Kyiv',
    //     address: req.query.address
    // })
})



app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMessage: 'Help article not found',
        title: '404 page',
        name: 'Koval'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        errorMessage: 'my 404 page',
        title: '404 page',
        name: 'Koval'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})