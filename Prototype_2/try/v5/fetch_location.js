function fetchLocationWeather(location) {
  var request = new XMLHttpRequest();
  var apiKey = "cdd1228da4be2430078ccf5f80d3d1f7"; // Replace with your OpenWeatherMap API key

  request.open(
    "GET",
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      encodeURIComponent(location) +
      "&appid=" +
      apiKey,
    true
  );

  request.onreadystatechange = function () {
    if (request.readyState === 4 && request.status === 200) {
      var response = JSON.parse(request.responseText);

      // Extract the required information
      var temperatureKelvin = response.main.temp;
      var humidity = response.main.humidity;
      var description = response.weather[0].description;

      // Convert temperature from Kelvin to Celsius and round it to an integer
      var temperatureCelsius = Math.floor(temperatureKelvin - 273.15);

      // Create a new JavaScript object with the filtered data
      var filteredData = {
        temperature: temperatureCelsius,
        humidity: humidity,
        description: description,
      };

      // Convert the JavaScript object to JSON format
      var jsonData = JSON.stringify(filteredData);

      // Save the JSON data to the database table
      saveWeatherData(location, jsonData);
    }
  };

  request.send();
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
      encodeURIComponent(location) +
      "&weatherData=" +
      encodeURIComponent(weatherData)
  );
}
