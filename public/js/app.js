console.log('Client side javascript file loaded')
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit',(event)=>{
    event.preventDefault()
    const location = search.value
    console.log(location)
    //set our paragraphs to indicate that data is currently being fetched.
    messageOne.textContent = 'Loading message...'
    messageTwo.textContent = ''
//fetch data from a url.
//note that fetch is not available in node.it is only available in client side js-which is why we are using it here.
fetch('http://localhost:3000/weather?address='+ location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            console.log(data.error)
            messageOne.textContent = data.error
        }else{
         console.log({
           location : data.location,
           forecast : data.forecast,
         })
         messageOne.textContent = data.location
         messageTwo.textContent = data.forecast
        }
    })
 });
});

