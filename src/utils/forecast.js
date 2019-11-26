const request = require('request');

const forecast = (latitude,longitude,forecastCallback)=>{
const url = 'https://api.darksky.net/forecast/5356674d1627faf64fd6114b1d6830a7/'+latitude+','+longitude+'?unit=us&lang=en';
request(
    {url,json:true},(error,{body})=>{ //shortcut syntax for url.
        if(error){
           forecastCallback('Unable to connect to the weather API',undefined);
        }else if(body.error){
            forecastCallback('Unable to find location',undefined);
        }else{
            const data={
                summary:body.daily.summary,
                temperature:body.currently.temperature,
                precipProbability:body.currently.precipProbability,
            };
            forecastCallback(undefined,data)
        }
    });
};

module.exports = forecast;