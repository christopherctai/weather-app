
const searchForm = document.querySelector('.search-form');
const locationQuery = searchForm.querySelector('#search');
searchForm.addEventListener('submit', searchLocation)

async function searchLocation () {
    try {
        let location = locationQuery.value;
        let data = await getWeatherData(location);
        let processedData = processWeatherData(data);
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