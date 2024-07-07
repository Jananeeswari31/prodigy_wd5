document.addEventListener('DOMContentLoaded', function() {
    const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key
    const searchBtn = document.getElementById('searchBtn');
    const locationInput = document.getElementById('locationInput');
    const locationElement = document.getElementById('location');
    const weatherDataElement = document.getElementById('weatherData');

    // Event listener for search button click
    searchBtn.addEventListener('click', function() {
        const location = locationInput.value;
        if (location.trim() === '') {
            alert('Please enter a location.');
            return;
        }

        getWeather(location);
    });

    // Function to fetch weather data from API
    async function getWeather(location) {
        try {
            const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;
            const response = await fetch(apiURL);
            const data = await response.json();

            if (data.cod !== 200) {
                throw new Error(data.message);
            }

            displayWeather(data);
        } catch (error) {
            console.error('Error fetching weather:', error);
            alert('Failed to fetch weather data. Please try again.');
        }
    }

    // Function to display weather data on the webpage
    function displayWeather(data) {
        const { name, main, weather } = data;
        const temperature = Math.round(main.temp);
        const description = weather[0].description;

        locationElement.textContent = name;
        weatherDataElement.innerHTML = `
            <p>Temperature: ${temperature}°C</p>
            <p>Description: ${description}</p>
        `;
    }

    // Automatically fetch weather based on user's geolocation (optional)
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async function(position) {
            const { latitude, longitude } = position.coords;
            const geoApiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
            const response = await fetch(geoApiURL);
            const data = await response.json();

            if (data.cod === 200) {
                displayWeather(data);
            }
        }, function(error) {
            console.error('Error getting geolocation:', error);
        });
    }
});