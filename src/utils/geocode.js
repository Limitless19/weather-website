const request = require('request');

const mapboxToken = 'pk.eyJ1IjoibGltaXRsZXNzMTkiLCJhIjoiY2sxcWs2cTI1MTB2ajNob2k1ajl3NGI4ZCJ9.jzkFit7Aav6OrGhkpN2Arw';

const geocode = (address,geocodeCallBack)=>{
    const geocodingUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token='+mapboxToken;
    request({url:geocodingUrl,json:true},(error,response)=>{
        if(error){
           geocodeCallBack('Unable to connect to geocode Api.Check connection and try again',undefined);
        }else if(response.body.features[0]===undefined){
        geocodeCallBack('Unable to find location.check input url and try again',undefined);
        }else{
            const data = {
              latitude: response.body.features[0].center[1],
              longitude : response.body.features[0].center[0],
              location : response.body.features[0].place_name,
            };
           geocodeCallBack(undefined,data);
        }
    });
};

module.exports = geocode;

