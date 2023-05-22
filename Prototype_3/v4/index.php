<!DOCTYPE html>
<html>
<head>
  <title>Weather Search</title>
  <link rel="stylesheet" type="text/css" href="styles.css">
</head>
<body>
  <div class="container">
    <h1>Weather Search</h1>
    <div class="search">
      <input type="text" class="search-bar" placeholder="Enter a city">
      <button>Search</button>
    </div>
    <div class="weather">
      <h2 class="city"></h2>
      <img class="icon" src="" alt="Weather Icon">
      <p class="description"></p>
      <p class="temp"></p>
      <p class="humidity"></p>
      <p class="wind"></p>
    </div>
    <div class="past-week">
      <button id="past-week-button">Show Past Week</button>
    </div>
  </div>
  
  <script src="script.js"></script>
</body>
</html>
