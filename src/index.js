
const searchForm = document.querySelector('.search-form');
const locationQuery = searchForm.querySelector('#search');
searchForm.addEventListener('submit', searchLocation)

async function searchLocation () {
    try {
        let location = locationQuery.value;
        let data = await getWeatherData(location);
        let processedData = processWeatherData(data);
        updateDisplay(processedData);
        return processedData; 
    } catch(error) {
        console.log(error);
    }
}

async function getWeatherData(location) {
    try {
        let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=812a5522c00940c58f902241232604&q=${location}&days=3`);
        let weatherData = await response.json();
        return weatherData;
    } catch(error) {
        console.log(error);
    }
}


function processWeatherData(data) {
    let processedWeatherData = {};
    processedWeatherData.conditionIcon = data.current.condition.icon;
    processedWeatherData.conditionText = data.current.condition.text;
    processedWeatherData.feelsLikeC = data.current.feelslike_c;
    processedWeatherData.feelsLikeF = data.current.feelslike_f;
    processedWeatherData.humidity = data.current.humidity;
    processedWeatherData.lastUpdated = data.current.last_updated;
    processedWeatherData.tempC = data.current.temp_c;
    processedWeatherData.tempF = data.current.temp_f;
    processedWeatherData.windKph = data.current.wind_kph;
    processedWeatherData.windMph = data.current.wind_mph; 
    processedWeatherData.forecast = data.forecast;
    processedWeatherData.locationName = data.location.name;

    return processedWeatherData;
}

const locationName = document.querySelector('.location-name');
const conditionIcon = document.querySelector('.condition-icon');
const conditionText = document.querySelector('.condition-text');
const temperature = document.querySelector('.temperature');
const feelsLikeTemperature = document.querySelector('.feels-like-temperature');
const humidity = document.querySelector('.humidity');
const wind = document.querySelector('.wind');

let isMetric = false; 

function updateDisplayToMetric() {
    isMetric = true;
}

function updateDisplayToImperial() {
    isMetric = false; 
}

function updateDisplay(data) {
    locationName.textContent = data.locationName;
    conditionIcon.src = data.conditionIcon;
    conditionText.textContent = data.conditionText;
    humidity.textContent = data.humidity;
    console.log(temperature)
    if (isMetric) {
        temperature.textContent = data.tempC; 
        feelsLikeTemperature.textContent = data.feelsLikeC;
        wind.textContent = data.windKph;
    } else {
        temperature.textContent = data.tempF;
        feelsLikeTemperature.textContent = data.feelsLikeF; 
        wind.textContent = data.windMph;
    }
}