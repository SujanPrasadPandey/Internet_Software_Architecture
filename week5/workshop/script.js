const API_KEY = "2cdb920fb0a04d56bbd21016232703";

async function fetchData(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

async function getCurrentWeather(location) {
  const url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${location}`;
  const data = await fetchData(url);
  return data;
}

async function searchWeather() {
  const searchQuery = document.getElementById("search").value;
  const data = await getCurrentWeather(searchQuery);
  displayWeatherData(data);
}

async function getCurrentLocation() {
  navigator.geolocation.getCurrentPosition(async (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const data = await getCurrentWeather(`${latitude},${longitude}`);
    displayWeatherData(data);
  });
}

function displayWeatherData(data) {
  const weatherDataDiv = document.getElementById("weather-data");
  weatherDataDiv.innerHTML = `
          <h2>${data.location.name}</h2>
          <p>Temperature: ${data.current.temp_c} C</p>
          <p>Condition: ${data.current.condition.text}</p>
        `;
}