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

// Funktion för att uppdatera dagens och morgondagens väder
async function updateWeather(destination) {
  const todayWeatherElement = document.getElementById('todayWeather');
  const tomorrowWeatherElement = document.getElementById('tomorrowWeather');

  try {
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
  } catch (error) {
    console.error('Error updating weather:', error);
  }
}

// Funktion för att uppdatera väder sektionens innehåll
function updateWeatherBox(element, title, weather) {
  element.querySelector('h3').textContent = title;
  element.querySelector('.temperature').textContent = `${weather.temperature}°C`;

  const iconElement = element.querySelector('.weather-icon');
  iconElement.innerHTML = `<img src="http://openweathermap.org/img/wn/${weather.icon}.png" alt="Weather Icon">`;
}

  // Funktion för att få användarens plats mha geolocation API
  function getUserLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        const todayWeatherElement = document.getElementById('todayWeather');
        const tomorrowWeatherElement = document.getElementById('tomorrowWeather');

        await updateWeatherByCoordinates(latitude, longitude, todayWeatherElement, tomorrowWeatherElement);
      },
      (error) => {
        console.error('Error getting user location:', error.message);
      }
    );
  } else {
    console.error('Geolocation is not supported by this browser.');
  }
}

// Funktion för att uppdatera väder baserat på koordinater
async function updateWeatherByCoordinates(latitude, longitude, todayWeatherElement, tomorrowWeatherElement) {
  try {
    const apiKey = '12e247c698472f275f1175f27e4b9602';
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;

    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }

    const weatherData = await response.json();

    if (weatherData) {
      const todayWeather = {
        temperature: Math.round(weatherData.list[0].main.temp),
        icon: weatherData.list[0].weather[0].icon,
      };
      const tomorrowWeather = {
        temperature: Math.round(weatherData.list[8].main.temp),
        icon: weatherData.list[8].weather[0].icon,
      };

  // Funktion för att uppdatera väder sektionens innehåll
      updateWeatherBox(todayWeatherElement, 'Idag', todayWeather);
      updateWeatherBox(tomorrowWeatherElement, 'Imorgon', tomorrowWeather);
    }
  } catch (error) {
    console.error('Error updating weather by coordinates:', error);
  }
}

// Anropa funktionen för att få användarens plats och uppdatera väder
getUserLocation();
