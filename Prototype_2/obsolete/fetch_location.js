// Step 5: If script.js gets false from check_location.php, it runs fetch_location.js, which will use the OpenWeatherMap API to get the weather data of the location and send the JSON weather data to the main script.js.

// Assuming you receive the location data as a POST parameter named "location"
const location = req.body.location;

// Assuming you have an OpenWeatherMap API key
const apiKey = "your_openweathermap_api_key";

// Assuming you use the axios library for making HTTP requests
const axios = require("axios");

// Make the API request to OpenWeatherMap
axios
  .get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`)
  .then((response) => {
    const weatherData = response.data;

    // Return the weather data as a JSON response
    res.json(weatherData);
  })
  .catch((error) => {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch weather data" });
  });
