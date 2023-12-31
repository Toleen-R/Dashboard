// Fetcha väder data från OpenWeatherMap API
async function fetchWeather(city) {
    const apiKey = '12e247c698472f275f1175f27e4b9602'; 
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch weather data');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching weather data:', error.message);
        return null;
    }
}

// Skapa en function för att uppdatera dagens och imorgons väder 
async function updateWeather(destination) {
    const todayWeatherElement = document.getElementById('todayWeather');
    const tomorrowWeatherElement = document.getElementById('tomorrowWeather');

    const weatherData = await fetchWeather(destination);

    if (weatherData) {
    
        const todayWeather = {
            temperature: Math.round(weatherData.list[0].main.temp),
            icon: weatherData.list[0].weather[0].icon,
        };
        const tomorrowWeather = {
            temperature: Math.round(weatherData.list[8].main.temp),
            icon: weatherData.list[8].weather[0].icon,
        };

        // Updatera HTML innehåll med väder information
        updateWeatherBox(todayWeatherElement, 'Idag', todayWeather);
        updateWeatherBox(tomorrowWeatherElement, 'Imorgon', tomorrowWeather);
    }
}

// Funktion för att uppdatera väder sektionens innehåll
function updateWeatherBox(element, title, weather) {
    element.querySelector('h3').textContent = title;
    element.querySelector('.temperature').textContent = `${weather.temperature}°C`;

    const iconElement = element.querySelector('.weather-icon');
    iconElement.innerHTML = `<img src="http://openweathermap.org/img/wn/${weather.icon}.png" alt="Weather Icon">`;
}

// Starta funktionen
updateWeather('Gothenburg'); 
