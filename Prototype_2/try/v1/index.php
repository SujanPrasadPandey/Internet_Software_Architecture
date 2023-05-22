<!DOCTYPE html>
<html>
  <head>
    <title>Weather App</title>
    <script src="script.js"></script>
  </head>
  <body>
    <h1>Weather App</h1>
    <form id="locationForm" accept-charset="UTF-8">
      <label for="locationInput">Enter Location:</label>
      <input type="text" id="locationInput" required />
      <button type="button" onclick="checkLocation()">Get Weather</button>
    </form>
    <div id="weatherData"></div>

    <script>
      document.getElementById('locationForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission
        checkLocation();
      });
    </script>
  </body>
</html>