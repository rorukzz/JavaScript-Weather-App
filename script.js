require('dotenv').config();

const apiKey = process.env.API_KEY;

document.addEventListener("DOMContentLoaded", function () {
    const getWeatherButton = document.getElementById("get-weather");
    const locationInput = document.getElementById("location");
    const weatherInfo = document.getElementById("weather-info");
    const body = document.body;

    getWeatherButton.addEventListener("click", function () {
        const location = locationInput.value.toUpperCase() || "auto:ip";

        fetch(`http://api.weatherstack.com/current?access_key=${apiKey}&query=${location}`)
            .then((response) => response.json())
            .then((data) => {
                const weatherData = data.current;
                const temperature = weatherData.temperature;
                const humidity = weatherData.humidity;

                // Display weather information to the user
                weatherInfo.innerHTML = `
                    <p><strong>Location:</strong> ${location}</p>
                    <p><strong>Temperature:</strong> ${temperature}°C</p>
                    <p><strong>Humidity:</strong> ${humidity}%</p>
                `;

                // Change background based on weather conditions
                if (temperature > 25 && humidity > 70) {
                    // High temperature and high humidity (sunny)
                    body.style.backgroundImage = "url('sunny-background.jpg')";
                } else if (temperature < 15 && humidity < 40) {
                    // Low temperature and low humidity (cloudy or rainy)
                    body.style.backgroundImage = "url('cloudy-background.jpg')";
                } else {
                    // Default background or other conditions
                    body.style.backgroundImage = "url('default-background.jpg')";
                }
            })
            .catch((error) => {
                weatherInfo.innerHTML = "Error fetching weather data.";
            });
    });
});
