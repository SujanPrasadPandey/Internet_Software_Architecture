<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Weather App</title>
  <link rel="stylesheet" type="text/css" href="style.css">
</head>
<body>
  <div class="search">
    <input type="text" class="search-bar" placeholder="Enter city name">
    <button>Search</button>
  </div>

  <div class="current-weather">
    <h2 class="city"></h2>
    <img class="icon" src="" alt="Weather Icon">
    <p class="description"></p>
    <p class="temp"></p>
    <p class="humidity"></p>
    <p class="wind"></p>
  </div>

  <h2>Past Week's Weather</h2>
  <table class="past-week-table">
    <thead>
      <tr>
        <th>Date</th>
        <th>Condition</th>
        <th>Temperature</th>
        <th>Rainfall</th>
        <th>Wind Speed</th>
        <th>Humidity</th>
        <th>Pressure</th>
      </tr>
    </thead>
    <tbody></tbody>
  </table>

  <script src="script.js"></script>
</body>
</html>
