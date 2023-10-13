document.addEventListener("DOMContentLoaded", function () {
    const apiKey = "61bdbb20093062fcb0335fe6acd5f77f"; // Replace with your API key
    const getWeatherButton = document.getElementById("get-weather");
    const locationInput = document.getElementById("location");
    const weatherInfo = document.getElementById("weather-info");

    getWeatherButton.addEventListener("click", function () {
        // Use the user's capitalized input or detect the current location
        const location = locationInput.value.toUpperCase() || "auto:ip";

        // Make an API request to Weatherstack
        fetch(`http://api.weatherstack.com/current?access_key=${apiKey}&query=${location}`)
            .then((response) => response.json())
            .then((data) => {
                const weatherData = data.current;
                const temperature = weatherData.temperature;
                const description = weatherData.weather_descriptions[0];
                const humidity = weatherData.humidity;
                const windSpeed = weatherData.wind_speed;

                // Display weather information to the user
                weatherInfo.innerHTML = `
                    <p><strong>Location:</strong> ${location}</p>
                    <p><strong>Temperature:</strong> ${temperature}°C</p>
                    <p><strong>Weather:</strong> ${description}</p>
                    <p><strong>Humidity:</strong> ${humidity}%</p>
                    <p><strong>Wind Speed:</strong> ${windSpeed} km/h</p>
                `;
            })
            .catch((error) => {
                weatherInfo.innerHTML = "Error fetching weather data.";
            });
    });
});
