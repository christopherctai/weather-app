
const searchForm = document.querySelector('.search-form');
const locationQuery = searchForm.querySelector('#search');
searchForm.addEventListener('submit', searchLocation);


const body = document.querySelector('body'); 

function getGIF() {
    fetch('https://api.giphy.com/v1/gifs/translate?api_key=5Sm4fMi9HFImp6QVYsjr9nIL07N1hjXy&s=rainy', {mode: 'cors'})
    .then(function(response) {
        return response.json()
    }) 
    .then(function(response) {
        body.style.backgroundImage = `url(${response.data.images.original.url})`;
    })
    .catch(function(error) {
        console.log(error)
    }); 
}


let processedData = setDefaultLocation(); 


async function setDefaultLocation() {
    try {
        let data = await getWeatherData('San Diego');
        processedData = processWeatherData(data);
        updateDisplay(processedData);
        return processedData
    } catch(error) {
        console.log(error);
    }
}

async function searchLocation() {
    try {
        let location = locationQuery.value;
        let data = await getWeatherData(location);
        processedData = processWeatherData(data);
        updateDisplay(processedData);
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
const lastUpdated = document.querySelector('.last-updated')
const humidity = document.querySelector('.humidity');
const wind = document.querySelector('.wind');
const changeTemperatureButton = document.querySelector('.temperature-modifier')

let isMetric = false;

changeTemperatureButton.addEventListener('click', () => {
    updateDisplayUnits(processedData)
}); 

function updateDisplayUnits(processedData) {
    if (isMetric) {
        updateDisplayToImperial(processedData);
    } else {
        updateDisplayToMetric(processedData);
    }
}

function updateDisplayToMetric(data) {
    isMetric = true;
    temperature.textContent = `${data.tempC} C`; 
    feelsLikeTemperature.textContent = `Feels Like ${data.feelsLikeC} C`;
    wind.textContent = `${data.windKph} Kph`;

    changeTemperatureButton.textContent = 'Change to Imperial';
}

function updateDisplayToImperial(data) {
    isMetric = false; 
    temperature.textContent = `${data.tempF} F`;
    feelsLikeTemperature.textContent = `Feels Like ${data.feelsLikeF} F`; 
    wind.textContent = `${data.windMph} Mph`; 

    changeTemperatureButton.textContent = 'Change to Metric';
}

function updateDisplay(data) {
    locationName.textContent = data.locationName;
    conditionIcon.src = data.conditionIcon;
    conditionText.textContent = data.conditionText;
    lastUpdated.textContent = `Last Updated: ${data.lastUpdated}`; 
    humidity.textContent = `${data.humidity}%`;
    if (isMetric) {
        updateDisplayToMetric(data);
    } else {
        updateDisplayToImperial(data); 
    }
}