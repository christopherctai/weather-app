(()=>{const e=document.querySelector(".search-form"),t=e.querySelector("#search");e.addEventListener("submit",(async function(){try{let e=t.value,n=await async function(e){try{let t=await fetch(`https://api.weatherapi.com/v1/forecast.json?key=812a5522c00940c58f902241232604&q=${e}&days=3`);return await t.json()}catch(e){console.log(e)}}(e),c=function(e){let t={};return t.conditionIcon=e.current.condition.icon,t.conditionText=e.current.condition.text,t.feelsLikeC=e.current.feelslike_c,t.feelsLikeF=e.current.feelslike_f,t.humidity=e.current.humidity,t.lastUpdated=e.current.last_updated,t.tempC=e.current.temp_c,t.tempF=e.current.temp_f,t.windKph=e.current.wind_kph,t.windMph=e.current.wind_mph,t.forecast=e.forecast,t.locationName=e.location.name,t}(n);console.log(c)}catch(e){console.log(e)}}))})();