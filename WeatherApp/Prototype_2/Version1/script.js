const apiKey = "cdd1228da4be2430078ccf5f80d3d1f7";
const cityNameElement = document.querySelector("#city-name");
const temperatureElement = document.querySelector("#temperature");
const humidityElement = document.querySelector("#humidity");
const pressureElement = document.querySelector("#pressure");
const windElement = document.querySelector("#wind");
const timeElement = document.querySelector("#time");
const descriptionElement = document.querySelector("#description");
const searchButton = document.querySelector("#search-button");
const saveButton = document.querySelector("#save-button");
const cityInput = document.querySelector("#city-input");

function getWeatherData(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      cityNameElement.textContent = data.name;
      temperatureElement.textContent = data.main.temp;
      humidityElement.textContent = data.main.humidity;
      pressureElement.textContent = data.main.pressure;
      windElement.textContent = data.wind.speed;
      const d = new Date();
      const localTime = d.getTime();
      const localOffset = d.getTimezoneOffset() * 60000;
      const utc = localTime + localOffset;
      const cityTime = utc + data.timezone * 1000;
      const nd = new Date(cityTime);
      timeElement.textContent = nd.toLocaleTimeString();
      descriptionElement.textContent = data.weather[0].description;
      const weatherIcon = document.querySelector("#weather-icon");
      const weatherCode = data.weather[0].icon;
      const iconUrl = `https://openweathermap.org/img/wn/${weatherCode}.png`;
      weatherIcon.setAttribute("src", iconUrl);
    })
    .catch((error) => {
      alert("Error");
      console.error(error);
    });
}

function saveWeatherData(city, temperature, humidity, pressure, wind) {
  // Send an AJAX request to the server to save the weather data
  const xhr = new XMLHttpRequest();
  const url = "insert_weather_data.php";
  const params = `city=${encodeURIComponent(
    city
  )}&temperature=${encodeURIComponent(
    temperature
  )}&humidity=${encodeURIComponent(humidity)}&pressure=${encodeURIComponent(
    pressure
  )}&wind_speed=${encodeURIComponent(wind)}`;
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      console.log(xhr.responseText);
    }
  };
  xhr.send(params);
}

searchButton.addEventListener("click", (event) => {
  event.preventDefault();
  const city = cityInput.value;
  getWeatherData(city);
});

saveButton.addEventListener("click", (event) => {
  event.preventDefault();
  const city = cityNameElement.textContent;
  const temperature = temperatureElement.textContent;
  const humidity = humidityElement.textContent;
  const pressure = pressureElement.textContent;
  const wind = windElement.textContent;
  saveWeatherData(city, temperature, humidity, pressure, wind);
});
