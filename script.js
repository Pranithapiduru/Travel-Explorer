const UNSPLASH_KEY = "u9MuzXyr9PXZJpgzTPWfvCkM_iP7KcrxOXLUxTmwCjc";
const WEATHER_KEY = "d77865e996bb415657f8f031a8af09bb";

async function explore() {
  const destination = document.getElementById("destination").value.trim();
  if (!destination) {
    alert("Please enter a destination!");
    return;
  }

  fetchPhotos(destination);
  fetchWeather(destination);
}

async function fetchPhotos(destination) {
  try {
    const url = `https://api.unsplash.com/search/photos?query=${destination}&per_page=6&client_id=${UNSPLASH_KEY}`;
    const res = await fetch(url);
    const data = await res.json();

    const photosDiv = document.getElementById("photos");
    photosDiv.innerHTML = "";

    if (data.results.length === 0) {
      photosDiv.innerHTML = "<p>No photos found.</p>";
      return;
    }

    data.results.forEach(photo => {
      const img = document.createElement("img");
      img.src = photo.urls.small;
      img.alt = destination;
      photosDiv.appendChild(img);
    });
  } catch (error) {
    console.error("Error fetching photos:", error);
  }
}

async function fetchWeather(destination) {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${destination}&appid=${WEATHER_KEY}&units=metric`;
    const res = await fetch(url);
    const data = await res.json();

    const weatherDiv = document.getElementById("weather");
    weatherDiv.innerHTML = "";

    if (data.cod !== 200) {
      weatherDiv.innerHTML = `<p>Weather not found for "${destination}".</p>`;
      return;
    }

    weatherDiv.innerHTML = `
      <h2>Weather in ${data.name}</h2>
      <p><strong>${data.weather[0].description}</strong></p>
      <p>🌡 Temperature: ${data.main.temp}°C</p>
      <p>💧 Humidity: ${data.main.humidity}%</p>
      <p>🌬 Wind Speed: ${data.wind.speed} m/s</p>
    `;
  } catch (error) {
    console.error("Error fetching weather:", error);
  }
}
