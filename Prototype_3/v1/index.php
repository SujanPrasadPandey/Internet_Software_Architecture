<!DOCTYPE html>
<html>
  <head>
    <title>Weather App</title>
    <link rel="stylesheet" href="styles.css">
  </head>
  <body>
    <h1>Weather App</h1>
    <form id="locationForm" accept-charset="UTF-8">
      <label for="locationInput">Enter Location:</label>
      <input type="text" id="locationInput" required />
      <button type="submit">Get Weather</button> <!-- Change button type to "submit" -->
    </form>
    <div id="weatherData"></div>
    <script src="script.js"></script>
  </body>
</html>
