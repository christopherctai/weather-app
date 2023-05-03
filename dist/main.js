(()=>{const t=document.querySelector(".search-form"),e=t.querySelector("#search");t.addEventListener("submit",(async function(){try{let t=e.value,n=await c(t);return o=i(n),q(o),o}catch(t){console.log(t)}}));const n=document.querySelectorAll(".nav-circle");n.forEach(((t,e)=>{t.addEventListener("click",(()=>{F(e,S(o)),t.classList.remove("selected"),w(e,n)}))})),document.querySelector("body");let o=async function(){try{let t=await c("San Diego");return o=i(t),q(o),o}catch(t){console.log(t)}}();async function c(t){try{let e=await fetch(`https://api.weatherapi.com/v1/forecast.json?key=812a5522c00940c58f902241232604&q=${t}&days=3`);return await e.json()}catch(t){console.log(t)}}function i(t){let e={};return e.conditionIcon=t.current.condition.icon,e.conditionText=t.current.condition.text,e.feelsLikeC=t.current.feelslike_c,e.feelsLikeF=t.current.feelslike_f,e.humidity=t.current.humidity,e.lastUpdated=t.current.last_updated,e.tempC=t.current.temp_c,e.tempF=t.current.temp_f,e.windKph=t.current.wind_kph,e.windMph=t.current.wind_mph,e.forecast=t.forecast,e.locationName=t.location.name,e}const r=document.querySelector(".location-name"),d=document.querySelector(".current-condition-icon"),a=document.querySelector(".current-condition-text"),l=document.querySelector(".temperature"),u=document.querySelector(".feels-like-temperature"),s=document.querySelector(".last-updated"),m=document.querySelector(".humidity"),f=document.querySelector(".wind"),p=document.querySelector(".temperature-modifier");let y=!1,h=0;function C(t){l.textContent=`${t.tempC} C`,u.textContent=`Feels Like ${t.feelsLikeC} C`,f.textContent=`${t.windKph} Kph`,x(t),p.textContent="Change to Imperial",y=!0}function x(t){let e=document.querySelectorAll(".temperature-forecast"),n=S(t);y?e.forEach(((t,e)=>{t.textContent=`${n[h][e].tempF} F`})):e.forEach(((t,e)=>{t.textContent=`${n[h][e].tempC} C`}))}function L(t){l.textContent=`${t.tempF} F`,u.textContent=`Feels Like ${t.feelsLikeF} F`,f.textContent=`${t.windMph} Mph`,x(t),p.textContent="Change to Metric",y=!1}function q(t){r.textContent=t.locationName,d.src=t.conditionIcon,a.textContent=t.conditionText,s.textContent=`Last Updated: ${t.lastUpdated}`,m.textContent=`${t.humidity}%`,y?C(t):L(t);let e=S(t);F(h,e),function(t){let e=t.forecast.forecastday,n=[];for(let t=0;t<3;t++){let o={};o.lowF=e[t].day.mintemp_f,o.highF=e[t].day.maxtemp_f,o.lowC=e[t].day.mintemp_c,o.highC=e[t].day.maxtemp_c,o.conditionText=e[t].day.condition.text,o.conditionIcon=e[t].day.condition.conditionIcon,n.push(o)}}(t),w(0,n)}function S(t){let e=t.forecast.forecastday[0].hour,n=[],o=0;for(let t=0;t<3;t++){let t=[];for(let n=o;n<o+8;n++){let o={};o.time=`${n}:00`,o.conditionIcon=e[n].condition.icon,o.conditionText=e[n].condition.text,o.tempC=e[n].temp_c,o.tempF=e[n].temp_f,t.push(o)}n.push(t),o+=8}return n}function F(t,e){let n=function(){let t=document.querySelector(".forecast-content");return t.textContent="",t}();for(let o=0;o<8;o++)n.append($(e[t][o]));return n}function w(t,e){e.forEach((t=>{t.classList.remove("selected")})),document.getElementById(t).classList.add("selected")}function $(t){let e=document.createElement("div");e.classList.add("time"),e.textContent=t.time;let n=document.createElement("div");n.classList.add("condition"),n.textContent=t.conditionText;let o=document.createElement("div");o.classList.add("temperature-forecast"),o.textContent=y?`${t.tempC} C`:`${t.tempF} F`;let c=document.createElement("img");c.classList.add("icon"),c.src=t.conditionIcon;let i=document.createElement("div");return i.classList.add("hourly-forecast"),i.append(e,o,c,n),i}p.addEventListener("click",(()=>{!function(t){y?L(t):C(t)}(o)}))})();