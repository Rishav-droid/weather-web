document.getElementById('getWeather').addEventListener('click', getWeather);

async function getWeather() {
    const city = document.getElementById('city').value.trim();
    const apiKey = '5e18c72934f8ede80605828b9a7cc0ad'; // Make sure this is your valid API key

    if (!city) {
        document.getElementById('weatherResult').innerText = 'Please enter a city name';
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        
        if (response.status === 401) {
            throw new Error('Invalid API key. Please check your OpenWeatherMap API key');
        }
        if (!response.ok) {
            throw new Error(data.message || 'Failed to fetch weather data');
        }
        
        displayWeather(data);
    } catch (error) {
        document.getElementById('weatherResult').innerText = error.message;
    }
}

function displayWeather(data) {
    const weatherResult = document.getElementById('weatherResult');
    const temperature = data.main.temp;
    const description = data.weather[0].description;
    const city = data.name;

    weatherResult.innerHTML = `
        <h2>Weather in ${city}</h2>
        <p>Temperature: ${temperature} °C</p>
        <p>Description: ${description}</p>
    `;
}