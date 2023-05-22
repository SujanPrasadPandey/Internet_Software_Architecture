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
      var cityName = response.name;
      var weatherCondition = response.weather[0].main;
      var weatherIcon = response.weather[0].icon;
      var rainfall = response.rain ? response.rain["1h"] : 0;
      var windSpeed = response.wind.speed;
      var pressure = response.main.pressure;

      // Convert temperature from Kelvin to Celsius and round it to an integer
      var temperatureCelsius = Math.floor(temperatureKelvin - 273.15);

      // Create a new JavaScript object with the filtered data
      var filteredData = {
        cityName: cityName,
        weatherCondition: weatherCondition,
        weatherIcon: weatherIcon,
        temperature: temperatureCelsius,
        rainfall: rainfall,
        windSpeed: windSpeed,
        humidity: humidity,
        pressure: pressure,
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

  // Parse the JSON string to access its properties
  var parsedData = JSON.parse(weatherData);

  // Update the parameter name to "parsedData" instead of "weatherData"
  xhr.send(
    "location=" +
      encodeURIComponent(location) +
      "&weatherData=" +
      encodeURIComponent(JSON.stringify(parsedData)) +
      "&cityName=" +
      encodeURIComponent(parsedData.cityName) +
      "&weatherCondition=" +
      encodeURIComponent(parsedData.weatherCondition) +
      "&weatherIcon=" +
      encodeURIComponent(parsedData.weatherIcon) +
      "&temperature=" +
      encodeURIComponent(parsedData.temperature) +
      "&rainfall=" +
      encodeURIComponent(parsedData.rainfall) +
      "&windSpeed=" +
      encodeURIComponent(parsedData.windSpeed) +
      "&humidity=" +
      encodeURIComponent(parsedData.humidity) +
      "&pressure=" +
      encodeURIComponent(parsedData.pressure)
  );
}
