
const searchForm = document.querySelector('.search-form');
const locationQuery = searchForm.querySelector('#search');
searchForm.addEventListener('submit', searchLocation);
let isMetric = false;
let slideNumber = 0;

// Set up navigation 

const dailyButton = document.querySelector('.daily');
const hourlyButton = document.querySelector('.hourly'); 
const carousel = document.querySelector('.carousel');

dailyButton.addEventListener('click', () => {
    changeToDaily();
})

hourlyButton.addEventListener('click', () => {
    changeToHourly();
})

function changeToDaily() {
    displayDailyForecast(processDailyForecastData(processedData));
    dailyButton.classList.add('selected');
    hourlyButton.classList.remove('selected');
    carousel.classList.add('hidden');
}

function changeToHourly() {
    displayHourlyForecast(0, processHourlyForecastData(processedData))
    hourlyButton.classList.add('selected'); 
    dailyButton.classList.remove('selected'); 
    carousel.classList.remove('hidden'); 
}

const navCircles = document.querySelectorAll('.nav-circle');
navCircles.forEach((circle, index) => {
    circle.addEventListener('click', () => {
        slideNumber = index; 
        displayHourlyForecast(slideNumber, processHourlyForecastData(processedData));
        circle.classList.remove('selected');
        selectNavCircle(slideNumber, navCircles); 
    })
})

function selectNavCircle(index, navCircles) {
    navCircles.forEach((circle) => {
        circle.classList.remove('selected');
    })
    let navCircle = document.getElementById(index);
    navCircle.classList.add('selected'); 
}

const leftArrow = document.getElementById('carousel-left');
const rightArrow = document.getElementById('carousel-right');
leftArrow.addEventListener('click', () => {
    if (slideNumber === 0) {
        slideNumber = 2; 
    } else {
        slideNumber -= 1; 
    }
    selectNavCircle(slideNumber, navCircles);
    displayHourlyForecast(slideNumber, processHourlyForecastData(processedData));
})
rightArrow.addEventListener('click', () => {
    if (slideNumber === 2) {
        slideNumber = 0;
    } else {
        slideNumber += 1; 
    }
    selectNavCircle(slideNumber, navCircles);
    displayHourlyForecast(slideNumber, processHourlyForecastData(processedData));
}) 




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
const conditionIcon = document.querySelector('.current-condition-icon');
const conditionText = document.querySelector('.current-condition-text');
const temperature = document.querySelector('.temperature'); 
const feelsLikeTemperature = document.querySelector('.feels-like-temperature');
const lastUpdated = document.querySelector('.last-updated')
const humidity = document.querySelector('.humidity');
const wind = document.querySelector('.wind');
const changeTemperatureButton = document.querySelector('.temperature-modifier')

changeTemperatureButton.addEventListener('click', () => {
    updateDisplayUnits(processedData)
}); 

// Functions for updating units Imperial <-> Metric 

function updateDisplayUnits(processedData) {
    if (isMetric) {
        updateDisplayToImperial(processedData);
    } else {
        updateDisplayToMetric(processedData);
    }
}

function updateDisplayToMetric(data) {
    temperature.textContent = `${data.tempC} C`; 
    feelsLikeTemperature.textContent = `Feels Like ${data.feelsLikeC} C`;
    wind.textContent = `${data.windKph} Kph`;
    updateHourlyDisplayUnits(data);
    changeTemperatureButton.textContent = 'Change to Imperial';
    isMetric = true;
}

function updateHourlyDisplayUnits(data) {
    let hourlyTempData = document.querySelectorAll('.temperature-forecast');
    let hourlyData = processHourlyForecastData(data);
    if (isMetric) {
        hourlyTempData.forEach((temp, index) => {
        temp.textContent = `${hourlyData[slideNumber][index].tempF} F`;
        }) 
    } else {
        hourlyTempData.forEach((temp, index) => {
        temp.textContent = `${hourlyData[slideNumber][index].tempC} C`;
        });
    }
} 

function updateDisplayToImperial(data) {
    temperature.textContent = `${data.tempF} F`;
    feelsLikeTemperature.textContent = `Feels Like ${data.feelsLikeF} F`; 
    wind.textContent = `${data.windMph} Mph`; 
    updateHourlyDisplayUnits(data);
    changeTemperatureButton.textContent = 'Change to Metric';
    isMetric = false; 
}

// Function to update the display

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
    changeToHourly();
    selectNavCircle(0, navCircles);
}

// Functions to handle forecast data 

function processHourlyForecastData(processedWeatherData) {
    let forecastHourlyData = processedWeatherData.forecast.forecastday[0].hour;
    let processedForecastHourlyData = []; 
    let x = 0;
    for (let i = 0; i < 3; i++) {
        let hourBlock = []
        for (let j = x; j < (x + 8); j++) {
            let hour = {}; 
            hour.time = `${j}:00`; 
            hour.conditionIcon = forecastHourlyData[j].condition.icon; 
            hour.conditionText = forecastHourlyData[j].condition.text; 
            hour.tempC = forecastHourlyData[j].temp_c;
            hour.tempF = forecastHourlyData[j].temp_f;
            hourBlock.push(hour);
        }
        processedForecastHourlyData.push(hourBlock);
        x += 8; 
    }
    return processedForecastHourlyData;
}

function processDailyForecastData(processedWeatherData) {
    let forecastDailyData = processedWeatherData.forecast.forecastday;
    let processedForecastDailyData = [];
    for (let i = 0; i < 3; i++) {
        let day = {}; 
        day.name = forecastDailyData[i].date; 
        day.lowF = forecastDailyData[i].day.mintemp_f;
        day.highF = forecastDailyData[i].day.maxtemp_f;
        day.lowC = forecastDailyData[i].day.mintemp_c;
        day.highC = forecastDailyData[i].day.maxtemp_c;
        day.conditionText = forecastDailyData[i].day.condition.text; 
        day.conditionIcon = forecastDailyData[i].day.condition.icon; 
        processedForecastDailyData.push(day);
    }
    return processedForecastDailyData;
}


function displayHourlyForecast(slideNumber, processedForecastHourlyData) {
    let forecastContent = clearForecastContent();
    for (let i = 0; i < 8; i++) {
        forecastContent.append(createHourlyForecastUnit(processedForecastHourlyData[slideNumber][i]))
    } 
    return forecastContent;
}

function displayDailyForecast(processedForecastDailyData) {
    let forecastContent = clearForecastContent();
    for (let i = 0; i < 3; i++) {
        forecastContent.append(createDailyForecastUnit(processedForecastDailyData[i])); 
    }
    return forecastContent;
}


function clearForecastContent() {
    let forecastContent = document.querySelector('.forecast-content');
    forecastContent.textContent = '';
    return forecastContent;
}

function createDailyForecastUnit(data) {
    let name = document.createElement('div');
    name.classList.add('name');
    name.textContent = data.name;
    
    let temperatureForecastHigh = document.createElement('div');
    temperatureForecastHigh.classList.add('temperature-forecast');
    let temperatureForecastLow = document.createElement('div');
    temperatureForecastLow.classList.add('temperature-forecast');
    
    if (isMetric) {
        temperatureForecastHigh.textContent = `High of ${data.highC} C`;
        temperatureForecastLow.textContent = `Low of ${data.lowC} C`;
    } else {
        temperatureForecastHigh.textContent = `High of ${data.highF} F`;
        temperatureForecastLow.textContent = `Low of ${data.lowF} F`;
    }
    
    let conditionIcon = document.createElement('img');
    conditionIcon.classList.add('icon');
    conditionIcon.src = data.conditionIcon;
    
    let conditionText = document.createElement('div');
    conditionText.classList.add('condition');
    conditionText.textContent = data.conditionText;
    
    let dailyForecastBlock = document.createElement('div');
    dailyForecastBlock.classList.add('daily-forecast');
    dailyForecastBlock.append(name, temperatureForecastHigh, temperatureForecastLow, conditionIcon, conditionText); 
    
    return dailyForecastBlock;  
}

function createHourlyForecastUnit(data) {

    let time = document.createElement('div');
    time.classList.add('time');
    time.textContent = data.time;
    
    let conditionText = document.createElement('div');
    conditionText.classList.add('condition');
    conditionText.textContent = data.conditionText;

    let temperatureForecast = document.createElement('div');
    temperatureForecast.classList.add('temperature-forecast');
    
    if (isMetric) {
        temperatureForecast.textContent = `${data.tempC} C`;
    } else {
        temperatureForecast.textContent = `${data.tempF} F`;
    }
    
    let conditionIcon = document.createElement('img');
    conditionIcon.classList.add('icon');
    conditionIcon.src = data.conditionIcon;
    
    let hourlyForecastBlock = document.createElement('div');
    hourlyForecastBlock.classList.add('hourly-forecast');
    hourlyForecastBlock.append(time, temperatureForecast, conditionIcon, conditionText); 
    
    return hourlyForecastBlock;  
}
