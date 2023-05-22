let weather = {
  apikey: "cdd1228da4be2430078ccf5f80d3d1f7",
  searchHistory: [],

  fetchWeather: function(city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=" +
        this.apikey
    )
      .then((response) => response.json())
      .then((data) => this.displayWeather(data))
      .catch((error) => console.log("Error fetching weather:", error));
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
    document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText = "Wind Speed: " + speed + " km/h";

    const weatherData = {
      city: name,
      icon: icon,
      description: description,
      temp: temp,
      humidity: humidity,
      speed: speed,
    };

    this.searchHistory.push(weatherData);
    this.saveSearchHistory();
    this.renderSearchHistory();
  },

  search: function() {
    const city = document.querySelector(".search-bar").value;
    if (city) {
      this.fetchWeather(city);
      document.querySelector(".search-bar").value = "";
    }
  },

  saveSearchHistory: function() {
    localStorage.setItem("weatherSearchHistory", JSON.stringify(this.searchHistory));
  },

  loadSearchHistory: function() {
    const savedSearchHistory = localStorage.getItem("weatherSearchHistory");
    if (savedSearchHistory) {
      this.searchHistory = JSON.parse(savedSearchHistory);
    }
  },

  renderSearchHistory: function() {
    const searchHistoryContainer = document.querySelector(".search-history");
    searchHistoryContainer.innerHTML = "";

    this.searchHistory.forEach((weatherData) => {
      const { city, temp } = weatherData;

      const searchItem = document.createElement("div");
      searchItem.classList.add("search-item");
      searchItem.innerText = city + ": " + temp + "°C";

      searchHistoryContainer.appendChild(searchItem);
    });
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

weather.loadSearchHistory();
weather.renderSearchHistory();
weather.fetchWeather("Alexander City");
