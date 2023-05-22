const apiKey = "cdd1228da4be2430078ccf5f80d3d1f7";
const cityNameElement = document.querySelector("#city-name");
const temperatureElement = document.querySelector("#temperature");
const humidityElement = document.querySelector("#humidity");
const pressureElement = document.querySelector("#pressure");
const windElement = document.querySelector("#wind");
const timeElement = document.querySelector("#time");
const descriptionElement = document.querySelector("#description");
const searchButton = document.querySelector("#search-button");
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

      // Get weather data for the past 7 days
      const pastDataApiUrl = `https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${data.coord.lat}&lon=${data.coord.lon}&units=metric&appid=${apiKey}`;
      fetch(pastDataApiUrl)
        .then((response) => response.json())
        .then((data) => {
          const pastData = data.hourly.slice(0, 24 * 7); // Get data for the past 7 days
          const pastTemperatures = pastData.map((hourData) => hourData.temp); // Extract temperature data
          const avgTemperature =
            pastTemperatures.reduce((sum, temp) => sum + temp) /
            pastTemperatures.length; // Calculate average temperature
          temperatureElement.textContent += ` (average: ${avgTemperature.toFixed(
            1
          )} &deg;C)`;
        });
    })
    .catch((error) => {
      console.log(error);
      cityNameElement.textContent = "City not found";
      temperatureElement.textContent = "";
      humidityElement.textContent = "";
      pressureElement.textContent = "";
      windElement.textContent = "";
      timeElement.textContent = "";
      descriptionElement.textContent = "";
      weatherIcon.setAttribute("src", "");
    });
}

searchButton.addEventListener("click", (event) => {
  event.preventDefault();
  const city = cityInput.value;
  getWeatherData(city);

  // Save weather data to the server
  const temperature = temperatureElement.textContent;
  const humidity = humidityElement.textContent;
  const pressure = pressureElement.textContent;
  const wind_speed = windElement.textContent;
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "insert_weather_data.php", true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.onreadystatechange = function () {
    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
      console.log("Weather data saved successfully");
    }
  };
  xhr.send(
    `temperature=${temperature}&humidity=${humidity}&pressure=${pressure}&wind_speed=${wind_speed}`
  );
});
