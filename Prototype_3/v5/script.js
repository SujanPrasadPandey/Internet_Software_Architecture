let weather = {
  apikey: "cdd1228da4be2430078ccf5f80d3d1f7",

  fetchWeather: function(city) {
    city = city.toUpperCase();
    const storedData = this.getStoredWeatherData(city);
    if (storedData) {
      this.displayWeather(storedData);
    } else {
      fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
          city +
          "&units=metric&appid=" +
          this.apikey
      )
        .then((response) => response.json())
        .then((data) => {
          this.saveWeatherDataToStorage(city, data);
          this.displayWeather(data);
        })
        .catch((error) => console.log("Error fetching weather:", error));
    }

    this.fetchPastWeekWeather(city); // Fetch and display past week's weather immediately
  },

  fetchPastWeekWeather: function(city) {
    fetch("fetch_past_week_weather.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `location=${city}`,
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Error fetching past week's weather: " + response.statusText);
        }
      })
      .then((data) => {
        if (data && data.length > 0) {
          this.displayPastWeekWeather(data);
          this.saveWeatherDataToStorage(city, data);
        } else {
          console.log("No past week's weather data available.");
        }
      })
      .catch((error) => this.handleError(error));
    
  },

  getStoredWeatherData: function(city) {
    const storedData = localStorage.getItem(city);
    if (storedData) {
      return JSON.parse(storedData);
    }
    return null;
  },

  saveWeatherDataToStorage: function(city, data) {
    localStorage.setItem(city, JSON.stringify(data));
  },

  displayWeather: function(data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;

    document.querySelector(".city").innerText = "Weather in " + name;
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + "@2x.png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = temp + "°C";
    document.querySelector(".humidity").innerText =
      "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText =
      "Wind Speed: " + speed + " km/h";
  },

  displayPastWeekWeather: function(data) {
    const table = document.querySelector(".past-week-table");
    const tbody = table.querySelector("tbody");
    tbody.innerHTML = "";

    for (let i = 0; i < data.length; i++) {
      const row = document.createElement("tr");
      const dateCell = document.createElement("td");
      const conditionCell = document.createElement("td");
      const tempCell = document.createElement("td");
      const rainfallCell = document.createElement("td");
      const windSpeedCell = document.createElement("td");
      const humidityCell = document.createElement("td");
      const pressureCell = document.createElement("td");

      const {
        date,
        condition,
        temperature,
        rainfall,
        wind_speed,
        humidity,
        pressure,
      } = data[i];
      dateCell.textContent = date;
      conditionCell.textContent = condition;
      tempCell.textContent = temperature;
      rainfallCell.textContent = rainfall;
      windSpeedCell.textContent = wind_speed;
      humidityCell.textContent = humidity;
      pressureCell.textContent = pressure;

      row.appendChild(dateCell);
      row.appendChild(conditionCell);
      row.appendChild(tempCell);
      row.appendChild(rainfallCell);
      row.appendChild(windSpeedCell);
      row.appendChild(humidityCell);
      row.appendChild(pressureCell);
      tbody.appendChild(row);
    }

    table.style.display = "block";
  },

  search: function() {
    let city = document.querySelector(".search-bar").value;
    if (city) {
      city = city.toUpperCase();
      this.fetchWeather(city);
      document.querySelector(".search-bar").value = "";
    }
  },

  handleError: function(error) {
    console.error("Error fetching past week's weather:", error);
  },
};

document.querySelector(".search button").addEventListener("click", function() {
  weather.search();
});

document.querySelector(".search-bar").addEventListener("keyup", function(event) {
  if (event.key === "Enter") {
    weather.search();
  }
});

weather.fetchWeather("Winslow");
