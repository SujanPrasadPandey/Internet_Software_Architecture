window.addEventListener("load", function () {
  const form = document.querySelector("form");
  const input = document.querySelector("#city-input");
  const searchButton = document.querySelector("#search-button");
  const cityName = document.querySelector("#city-name");
  const weatherIcon = document.querySelector("#weather-icon");
  const description = document.querySelector("#description");
  const temperature = document.querySelector("#temperature");
  const humidity = document.querySelector("#humidity");
  const pressure = document.querySelector("#pressure");
  const wind = document.querySelector("#wind");
  const time = document.querySelector("#time");

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const city = input.value.trim();
    if (!city) return;
    const url = `/weather.php?city=${city}`;

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        cityName.textContent = data.name;
        weatherIcon.setAttribute(
          "src",
          `http://openweathermap.org/img/w/${data.weather[0].icon}.png`
        );
        description.textContent = data.weather[0].description;
        temperature.textContent = data.main.temp;
        humidity.textContent = data.main.humidity;
        pressure.textContent = data.main.pressure;
        wind.textContent = data.wind.speed;
        time.textContent = new Date().toLocaleTimeString();

        // Check if data exists in the database and if last update time was more than 60 minutes ago
        fetch(`/check_weather_data.php?city=${city}`)
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((data) => {
            if (data.exists && data.last_update_time) {
              const now = Date.now();
              const lastUpdateTime = Date.parse(data.last_update_time);
              const timeDiff = (now - lastUpdateTime) / 1000 / 60; // difference in minutes
              if (timeDiff <= 60) {
                // Use data from the database if last update time was within 60 minutes
                temperature.textContent = data.temperature;
                humidity.textContent = data.humidity;
                pressure.textContent = data.pressure;
                wind.textContent = data.wind_speed;
                time.textContent = data.last_update_time;
              }
            }
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  });
});
