let forcastDivs = document.querySelectorAll(".forC")
// catch the elements
let input = document.querySelector("#input")
let clickSearch = document.querySelector("#click")
var city =  "Delhi"
clickSearch.addEventListener("click",()=>{
    console.log(input.value)
    city = input.value
    cityy(city)
    getTemprature()
    getForcast()
})
getTemprature()

console.log("input",input)
//
let APIkey = "aa2338a405271c2dbb7943eb7c748def";

// set value in innerHTML
document.querySelector(".day>p").textContent = `${new Date().getDate()}-${new Date().getMonth()+1}-${new Date().getFullYear()}`
document.querySelector(".location_city > p").textContent =city
function cityy(city){
    document.querySelector(".location_city > p").textContent =city
// console.log("cc:",city)
}
document.querySelector(".day > h2").textContent = getDay(new Date().getDay())[1]

let humidity, windSpeed, temprature,  weather;
async function getTemprature() {
    console.log("Time",new Date().getHours())
    try {
        let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIkey}`);
        let data = await response.json()
        console.log(data)
        weather = data.weather[0].main
        document.querySelector(".clear").textContent = weather
        document.querySelector(".weatherImg").innerHTML = new Date().getHours() >= 19 || new Date().getHours() <= 4 ? `<img class="forImg" src="./images/night.png" /> ` :  `<img class="forImg" src=${findWeatherImg(weather)} /> `
        temprature = data.main.temp;
        document.querySelector(".tempMain").innerHTML = `${Math.round(temprature)}°C`
        windSpeed = data.wind.speed;
        document.querySelector(".wind > .value").textContent = windSpeed + " km/h"
        humidity = data.main.humidity;
        document.querySelector(".humi > .value").textContent = humidity + " %"
    } catch (error) {
        document.querySelector(".location_city > p").textContent = "City Not Found.. Try again!"
        console.log(error)
    }
}

getTemprature()
// get for cast next 3 days
async function getForcast() {
    // console.log(forcastDivs)
    try {
        let res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${APIkey}`);
        let data = await res.json();
        // console.log(data)
       let forDays = data.list.filter((ele, index) => index % 8 == 0);
    //    console.log(forDays)
       for(let i = 0; i < 4; i++){
        let wDate = new Date(forDays[i].dt * 1000).getDay()
        let day =  getDay(wDate)
        // console.log(wDate)
        let wMain = forDays[i].weather[0].main;
        let wTemp = forDays[i].main.temp;
        let img = findWeatherImg(wMain)
        
        forcastDivs[i].innerHTML = `<div>
                                       <img src=${img} />
                                    </div> 
                                    <h2>${day[0]}</h2>
                                    <h1>${Math.round(wTemp)}°C</h1>
                                    `
       }
        
    } catch (error) {

    }
}
getForcast()

// get image according to weather
function findWeatherImg(weather) {
    switch (weather) {
        case 'Clear': return "./images/clear.png"
        case 'Clouds': return "./images/clouds.png"
        case 'Drizzle': return "./images/drizzle.png"
        case 'Mist': return "./images/mist.png"
        case 'Rain': return "./images/rain.png"
        case 'Snow': return "./images/snow.png"
        case 'Smoke': return "./images/mist.png"
        case 'Thunderstorm' : return  "./images/thunder"
        case 'Haze' : return "./images/fog.png"
        case "Fog" : return "./images/fog.png"
    }
}

// get day function
function getDay(day){
    switch(day){
        case 0 : return ["Sun","Sunday"]
        case 1 : return ["Mon","Monday"]
        case 2 : return ["Tue","Tuesday"]
        case 3 : return ["Wed","Wednesday"]
        case 4 : return ["Thu","Thursday"]
        case 5 : return ["Fri","Friday"]
        case 6 : return ["Sat","Saturday"]

    }
}