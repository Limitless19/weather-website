console.log('Client side javascript file loaded')
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const highTemperatureMessage = document.querySelector('#high-temperature')
const lowTemperatureMessage = document.querySelector('#low-temperature')

weatherForm.addEventListener('submit',(event)=>{
    event.preventDefault()
    const location = search.value
    console.log(location)
    //set our paragraphs to indicate that data is currently being fetched.
    messageOne.textContent = 'Loading message...'
    messageTwo.textContent = ''
//fetch data from a url.
//note that fetch is not available in node.it is only available in client side js-which is why we are using it here.
fetch('/weather?address='+ location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            console.log(data.error)
            messageOne.textContent = data.error
        }else{
         console.log({
           location : data.location,
           forecast : data.forecast,
           temperatureHigh: data.temperatureHigh,
           temperatureLow : data.temperatureLow,
         })
         messageOne.textContent = data.location
         messageTwo.textContent = data.forecast
         highTemperatureMessage.textContent = "Highest temeprature today is " + data.temperatureHigh +" degress"
         lowTemperatureMessage.textContent = "Lowest temeprature today is " +  data.temperatureLow + " degress"
        }
    })
 });
});

