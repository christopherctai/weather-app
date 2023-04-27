async function getWeatherData(location) {
    try {
        let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=812a5522c00940c58f902241232604&q=${location}&days=3`);
        let weatherData = await response.json();
        console.log(weatherData);
    } catch(error) {
        console.log(error);
    }
}


function processWeatherData(data) {
    let weather;
}


getWeatherData('london');
getForecastWeatherData('london');