const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

// Define a default page with a html
const app = express();

// Define paths fro express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

var forecastInfo;

// Setup handlebars and views locations
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('/' , (req , res)=>{
   res.render('index', {
       title: 'Weather App',
       name: 'Jose Mejia'
   });
});

app.get('/about' , (req , res)=>{
   res.render('about', {
       title: 'About me',
       name: 'Jose Mejia'
   });
});

app.get('/help' , (req , res)=>{
    res.render('help', {
        message: 'Hello from the help',
        title: 'Help',
        name: 'Jose Mejia'
    });
});

// Default root in case there is no default html
// app.get('/' , (req , res)=>{
//    res.send('<h1>Weather</h1>');
// });

app.get('/weather' , (req , res) => {
    if ( !req.query.address ) {
        return res.send({
            error: 'You must provide an address'
        });
    }
    geocode(req.query.address, (error, { location, city } = {}) => {
        if (error) {
            return res.send({ error });
        }
        forecast(city, (error, forecastData) => {
            if (error) {
                res.send({ error });
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            });
        });
    });
});

app.get('/products' , (req , res)=>{
    if ( !req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        });
    } 
    console.log(req.query.search);
    res.send({
        products: []
    });
});

app.get('/help/*' , (req , res)=>{
   res.render('404', {
       title: 'help 404',
       message: 'Help article not found',
       name: 'Jose Mejia'
   });
});

app.get('*' , (req , res)=>{
   res.render('404', {
       title: '404',
       message: 'Page not found',
       name: 'Jose Mejia'
   });
});

app.listen(3000, () => {
    console.log('App running on port 3000');
});