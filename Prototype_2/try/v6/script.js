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
              fetchLocationWeather(location); // Call the new function to fetch weather data from OpenWeatherMap API
          } else {
              fetchWeatherData(location); // Call the function to fetch weather data from the database
          }
      }
  };
  xhr.send("location=" + encodeURIComponent(location));
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
      } else {
        console.log("Error: " + xhr.status);
      }
    }
  };
  xhr.send("location=" + location);
}
