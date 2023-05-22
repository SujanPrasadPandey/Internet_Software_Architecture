document.getElementById("locationForm").addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent default form submission
  checkLocation();
});

function checkLocation() {
  var location = document.getElementById("locationInput").value;

  // Send an AJAX request to check_location.php
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "check_location.php", true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      var response = xhr.responseText;
      if (response === "No") {
        fetchPastWeekWeather(location); // Call the new function to fetch weather data for the past week
      } else {
        fetchWeatherData(location); // Call the function to fetch weather data from the database
      }
    }
  };
  xhr.send("location=" + encodeURIComponent(location));
}

function fetchPastWeekWeather(location) {
  var currentDate = new Date(); // Get the current date
  var oneDay = 24 * 60 * 60 * 1000; // Number of milliseconds in a day
  var apiKey = "cdd1228da4be2430078ccf5f80d3d1f7"; // Replace with your OpenWeatherMap API key

  // Loop 7 times to fetch weather data for the past week
  for (var i = 0; i < 7; i++) {
    var pastDate = new Date(currentDate.getTime() - (i * oneDay));
    var unixTimestamp = Math.floor(pastDate.getTime() / 1000); // Convert to UNIX timestamp

    fetchLocationWeather(location, unixTimestamp);
  }
}

function fetchWeatherData(location) {
  // Send an AJAX request to fetch_location.php
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "fetch_location.php", true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      if (xhr.status == 200) {
        document.getElementById("weatherData").innerHTML = xhr.responseText;
        console.log("Error no: " + xhr.status);
      } else {
        console.log("Error: " + xhr.status);
      }
    }
  };
  xhr.send("location=" + location);
}
