(()=>{const e=document.querySelector(".search-form"),t=e.querySelector("#search");e.addEventListener("submit",(async function(){try{let e=t.value,r=await o(e);n=c(r),C(n)}catch(e){console.log(e)}})),document.querySelector("body");let n=async function(){try{let e=await o("San Diego");return n=c(e),C(n),n}catch(e){console.log(e)}}();async function o(e){try{let t=await fetch(`https://api.weatherapi.com/v1/forecast.json?key=812a5522c00940c58f902241232604&q=${e}&days=3`);return await t.json()}catch(e){console.log(e)}}function c(e){let t={};return t.conditionIcon=e.current.condition.icon,t.conditionText=e.current.condition.text,t.feelsLikeC=e.current.feelslike_c,t.feelsLikeF=e.current.feelslike_f,t.humidity=e.current.humidity,t.lastUpdated=e.current.last_updated,t.tempC=e.current.temp_c,t.tempF=e.current.temp_f,t.windKph=e.current.wind_kph,t.windMph=e.current.wind_mph,t.forecast=e.forecast,t.locationName=e.location.name,t}const r=document.querySelector(".location-name"),i=document.querySelector(".condition-icon"),u=document.querySelector(".condition-text"),a=document.querySelector(".temperature"),l=document.querySelector(".feels-like-temperature"),d=document.querySelector(".last-updated"),s=document.querySelector(".humidity"),m=document.querySelector(".wind"),p=document.querySelector(".temperature-modifier");let y=!1;function f(e){y=!0,a.textContent=`${e.tempC} C`,l.textContent=`Feels Like ${e.feelsLikeC} C`,m.textContent=`${e.windKph} Kph`,p.textContent="Change to Imperial"}function h(e){y=!1,a.textContent=`${e.tempF} F`,l.textContent=`Feels Like ${e.feelsLikeF} F`,m.textContent=`${e.windMph} Mph`,p.textContent="Change to Metric"}function C(e){r.textContent=e.locationName,i.src=e.conditionIcon,u.textContent=e.conditionText,d.textContent=`Last Updated: ${e.lastUpdated}`,s.textContent=`${e.humidity}%`,y?f(e):h(e),console.log(e)}p.addEventListener("click",(()=>{!function(e){y?h(e):f(e)}(n)}))})();