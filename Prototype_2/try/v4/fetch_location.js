function fetchLocationWeather(location) {
  var apiKey = "cdd1228da4be2430078ccf5f80d3d1f7";
  var url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    encodeURIComponent(location) +
    "&appid=" +
    apiKey;

  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      if (xhr.status == 200) {
        var weatherData = JSON.parse(xhr.responseText);
        saveWeatherData(location, weatherData); // Call the function to save weather data to the database
      } else {
        console.log("Error: " + xhr.status);
      }
    }
  };
  xhr.send();
}

function saveWeatherData(location, weatherData) {
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "populate_table.php", true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      console.log(xhr.responseText);
    }
  };
  xhr.send(
    "location=" +
      location +
      "&weatherData=" +
      encodeURIComponent(JSON.stringify(weatherData))
  );
}
