document.getElementById('locationForm').addEventListener('submit', function(event) {
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
      if (xhr.responseText === "Yes") {
        fetchWeatherData(location);
      } else {
        document.getElementById("weatherData").innerHTML = "No weather data found for the location '" + location + "'.";
      }
    }
  };
  xhr.send("location=" + location);
}

function fetchWeatherData(location) {
  // Send an AJAX request to fetch_location.php
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "fetch_location.php", true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      document.getElementById("weatherData").innerHTML = xhr.responseText;
    }
  };
  xhr.send("location=" + location);
}
