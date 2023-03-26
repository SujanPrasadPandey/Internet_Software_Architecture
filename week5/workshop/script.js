const apiKey = 'cdd1228da4be2430078ccf5f80d3d1f7';
const cityNameElement = document.querySelector('#city-name');
const temperatureElement = document.querySelector('#temperature');
const humidityElement = document.querySelector('#humidity');
const descriptionElement = document.querySelector('#description');
const searchButton = document.querySelector('#search-button');
const cityInput = document.querySelector('#city-input');

function getWeatherData(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      cityNameElement.textContent = data.name;
      temperatureElement.textContent = data.main.temp;
      humidityElement.textContent = data.main.humidity;
      descriptionElement.textContent = data.weather[0].description;
    })
    .catch(error => {
      alert('Error');
      console.error(error);
    });
}

searchButton.addEventListener('click', event => {
  event.preventDefault();
  const city = cityInput.value.trim();
  if (city !== '') {
    getWeatherData(city);
  }
});

getWeatherData("Winslow");
