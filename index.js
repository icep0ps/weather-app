const city = document.querySelector('#location');
const description = document.querySelector('#description');
const temperature = document.querySelector('#temp');
const wind = document.querySelector('#wind');
const pressure = document.querySelector('#pressure');
const humidity = document.querySelector('#Humidity');
const visibility = document.querySelector('#visibility');
const search = document.querySelector('#search');
const searchBtn = document.querySelector('button');
const convertBtn = document.querySelector('#convert');
const img = document.querySelector('#img');

async function getWeather() {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${search.value}&appid=a6695e8a717d0759207eb5f6c56671b1`
    );
    const data = await response.json();
    const weather = data;
    displayWeather(weather);
    return weather;
  } catch {
    console.log('invalid');
  }
}

let kelvinTemp = undefined;
function displayWeather(weather) {
  city.innerText = weather.name;
  description.innerText = weather.weather[0].description;
  temperature.innerText = `${parseInt(weather.main.temp - 273.15)}°C`;
  kelvinTemp = parseInt(weather.main.temp);
  wind.innerText = `${weather.wind.speed}m/s`;
  pressure.innerText = `${weather.main.pressure} hPa`;
  humidity.innerText = `${weather.main.humidity}%`;
  visibility.innerText = `${weather.visibility / 1000}km`;
  var iconcode = weather.weather[0].icon;
  var iconurl = 'http://openweathermap.org/img/wn/' + iconcode + '@2x.png';
  img.src = iconurl;
}

function convert() {
  let result = 0;
  switch (convertBtn.innerText) {
    case 'Convert to °F':
      convertBtn.innerText = `Convert to °C`;
      result = ((kelvinTemp - 273.15) * 9) / 5 + 32;
      temperature.innerText = `${parseInt(result)} °F`;
      break;
    case 'Convert to °C':
      convertBtn.innerText = `Convert to °F`;
      result = kelvinTemp - 273.15;
      temperature.innerText = `${parseInt(result)} °C`;
  }
}

convertBtn.addEventListener('click', convert);
searchBtn.addEventListener('click', getWeather);
getWeather();
