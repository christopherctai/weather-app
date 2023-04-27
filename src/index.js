async function getWeatherData(location) {
    try {
        let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=812a5522c00940c58f902241232604&q=${location}&days=3`);
        let weatherData = await response.json();
        console.log(weatherData);
        return weatherData;
    } catch(error) {
        console.log(error);
    }
}


function processWeatherData(data) {
    let conditionIcon = data.current.condition.icon;
    let conditionText = data.current.condition.text;
    let feelsLikeC = data.current.feelslike_c;
    let feelsLikeF = data.current.feelslike_f;
    let humidity = data.current.humidity;
    let lastUpdated = data.current.last_updated;
    let tempC = data.current.temp_c;
    let tempF = data.current.temp_f;
    let windKph = data.current.wind_kph;
    let windMph = data.current.wind_mph; 
    let forecast = data.forecast;

    console.log(conditionIcon, conditionText, feelsLikeC, feelsLikeF, humidity, lastUpdated,
        tempC, tempF, windKph, windMph, forecast);
}


getWeatherData('london').then((response) => {processWeatherData(response)});
