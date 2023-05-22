<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Weather App</title>
  <link rel="stylesheet" href="styles.css">
</head>

<body>
  <div class="container">
    <div class="weather loading">
      <h2 class="city">Weather in </h2>
      <img class="icon" src="" alt="Weather Icon">
      <p class="description"></p>
      <p class="temp"></p>
      <p class="humidity"></p>
      <p class="wind"></p>
    </div>
    <div class="search">
      <input type="text" class="search-bar" placeholder="Enter city name">
      <button>Search</button>
    </div>
    <div class="search-history">
      <h3>Search History</h3>
      <!-- Search history items will be dynamically added here -->
    </div>
  </div>

  <script src="script.js"></script>
</body>

</html>
