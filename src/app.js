const path = require('path');
const express = require('express');//express is actually a function and not an object like most of other libraries.
const hbs = require('hbs');
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express();
const localPortNumber = 3000
const portNumber = process.env.PORT || localPortNumber

//paths for express config
const publicDirectoryPath = path.join(__dirname,"../public");
const viewsPath = path.join(__dirname,"../templates/views");
const partialsPath = path.join(__dirname,"../templates/partials");

hbs.registerPartials(partialsPath);

//set up handlebars engine and views location.
app.set('view engine', 'hbs');
app.set('views',viewsPath);

//set up static directory to serve.
app.use(express.static(publicDirectoryPath)); //serve up this folder with the path to the server.


app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather App index',
        name:'Andrew Mead index',
    })
});

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'Weather App about',
        aboutMain:'This is the about main content.',
        aboutSub:'This is the about sub content.',
        name:'Andrew Mead about',
    })
});

app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'Weather App help',
        helpMessage:'This is the help message content.',
        helpSub:'This is the help sub content.',
        name:'Andrew Mead help',
    })
});

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return  res.send({
            error : 'Enter the required search query',
        });
    }
    return res.send({
        product : [],
    });
});

app.get('/weather',(req, res)=>{
    if(!req.query.address){
        return res.send({
           error: 'You must provide an address',
        });
    }
    geocode(req.query.address,(error,{latitude ,longitude ,location}={})=>{
        if(error){
            return res.send({
                error,
            });
        }
        forecast(latitude,longitude,(forcastError,forecastData)=>{
            if(forcastError){
                return res.send({
                   forcastError,
                });
            }
            return res.send({
                forecast : forecastData.summary,
                location,
                address : req.query.address,
                temperatureHigh: forecastData.temperatureHigh,
                temperatureLow: forecastData.temperatureLow,
            });
        });
    });
});

app.get('/help/*',(req,res)=>{
    res.render('help404',{
        title: 'Help 404 page',
        helpMessage:'This is the Help 404 page content.',
        helpSub:'This is the Help 404 page sub content.',
        name:'Andrew Mead help 404',
        rep:'Help article not found',
    })
});


app.get('*',(req,res)=>{
    res.render('help404',{
        rep: 'Page not found.'
    })
});


app.listen(portNumber,()=>{
    console.log('Server is up on port '+portNumber);
});

