const apiKey = '89fd4b2653979041a222fe8c5441dc0a'; // Placeholder API key - replace with your own
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const weatherInfo = document.getElementById('weather-info');
const cityName = document.getElementById('city-name');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');
const weatherIcon = document.getElementById('weather-icon');
const errorMessage = document.getElementById('error-message');

searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        fetchWeather(city);
    }
});

cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const city = cityInput.value.trim();
        if (city) {
            fetchWeather(city);
        }
    }
});

async function fetchWeather(city) {
    try {
        const response = await fetch(`${apiUrl}?q=${city}&appid=${apiKey}&units=metric`);
        const data = await response.json();

        if (response.ok) {
            displayWeather(data);
        } else {
            displayError('City not found. Please try again.');
        }
    } catch (error) {
        displayError('An error occurred. Please check your internet connection and try again.');
    }
}

function displayWeather(data) {
    cityName.textContent = data.name;
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    description.textContent = data.weather[0].description;
    weatherIcon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    weatherIcon.alt = data.weather[0].description;

    weatherInfo.classList.remove('hidden');
    errorMessage.classList.add('hidden');
}

function displayError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.remove('hidden');
    weatherInfo.classList.add('hidden');
}
