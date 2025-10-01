document.addEventListener("DOMContentLoaded", () => {
  const cityInput = document.getElementById("cityInput");
  const exploreBtn = document.getElementById("exploreBtn");

  exploreBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city) {
      loadPhotos(city);
      loadWeather(city);
      loadMap(city);
    }
  });
});

async function loadPhotos(city) {
  const photosDiv = document.getElementById("photos");
  photosDiv.innerHTML = "⏳ Loading photos...";
  try {
    const res = await fetch(
      `https://api.unsplash.com/search/photos?query=${city}&client_id=${CONFIG.UNSPLASH_KEY}&per_page=6`
    );
    const data = await res.json();
    photosDiv.innerHTML = "";
    if (data.results.length === 0) {
      photosDiv.innerHTML = "⚠️ No photos found.";
      return;
    }
    data.results.forEach(photo => {
      const img = document.createElement("img");
      img.src = photo.urls.small;
      img.alt = city;
      photosDiv.appendChild(img);
    });
  } catch (err) {
    photosDiv.innerHTML = "⚠️ Error loading photos.";
  }
}

async function loadWeather(city) {
  const weatherDiv = document.getElementById("weather");
  weatherDiv.innerHTML = "⏳ Loading weather...";
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${CONFIG.WEATHER_KEY}&units=metric`
    );
    const data = await res.json();
    if (data.cod !== 200) {
      weatherDiv.innerHTML = "⚠️ City not found.";
      return;
    }
    weatherDiv.innerHTML = `
      🌡️ Temperature: ${data.main.temp}°C <br>
      ☁️ Condition: ${data.weather[0].description} <br>
      💨 Wind: ${data.wind.speed} m/s
    `;
  } catch (err) {
    weatherDiv.innerHTML = "⚠️ Error loading weather.";
  }
}

// Map without API key (static city map)
function loadMap(city) {
  const mapDiv = document.getElementById("map");
  mapDiv.innerHTML = `
    <iframe
      width="100%"
      height="400"
      style="border-radius: 10px;"
      src="https://www.google.com/maps?q=${city}&output=embed">
    </iframe>
  `;
}
