(()=>{const e=document.querySelector(".search-form"),t=e.querySelector("#search");e.addEventListener("submit",(async function(){try{let e=t.value,i=await async function(e){try{let t=await fetch(`https://api.weatherapi.com/v1/forecast.json?key=812a5522c00940c58f902241232604&q=${e}&days=3`);return await t.json()}catch(e){console.log(e)}}(e),u=function(e){let t={};return t.conditionIcon=e.current.condition.icon,t.conditionText=e.current.condition.text,t.feelsLikeC=e.current.feelslike_c,t.feelsLikeF=e.current.feelslike_f,t.humidity=e.current.humidity,t.lastUpdated=e.current.last_updated,t.tempC=e.current.temp_c,t.tempF=e.current.temp_f,t.windKph=e.current.wind_kph,t.windMph=e.current.wind_mph,t.forecast=e.forecast,t.locationName=e.location.name,t}(i);return function(e){n.textContent=e.locationName,c.src=e.conditionIcon,o.textContent=e.conditionText,r.textContent=e.humidity}(u),u}catch(e){console.log(e)}}));const n=document.querySelector(".location-name"),c=document.querySelector(".condition-icon"),o=document.querySelector(".condition-text"),r=(document.querySelector(".temperature"),document.querySelector(".feels-like-temperature"),document.querySelector(".humidity"));document.querySelector(".wind")})();