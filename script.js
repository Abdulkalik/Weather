// Din API-nøkkel
const API_KEY = "a1060362d5d2368e864a99df75de2208";

// Hent elementer
const cityInput = document.getElementById("cityInput");
const fetchBtn = document.getElementById("fetchBtn");
const geoBtn = document.getElementById("geoBtn");
const result = document.getElementById("result");
const errorEl = document.getElementById("error");

// Vis feil
function showError(msg) {
  errorEl.textContent = msg;
  result.innerHTML = "";
}

// Vis vær
function showWeather(data) {
  result.innerHTML = `
    <h2>${data.name}, ${data.sys.country}</h2>
    <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">
    <p>${data.main.temp}°C (føles som ${data.main.feels_like}°C)</p>
    <p>${data.weather[0].description}</p>
  `;
}

// Hent vær for by
async function fetchWeather(city) {
  if (!city) return showError("Skriv inn en by.");
  result.innerHTML = "Laster...";
  try {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&lang=nb&appid=${API_KEY}`);
    if (!res.ok) throw new Error("Fant ikke byen.");
    const data = await res.json();
    showWeather(data);
  } catch (e) {
    showError(e.message);
  }
}



// Knapp-trykk
fetchBtn.addEventListener("click", () => fetchWeather(cityInput.value.trim()));
cityInput.addEventListener("keydown", e => { if(e.key==="Enter") fetchWeather(cityInput.value.trim()); });

// Geolokasjon
geoBtn.addEventListener("click", () => {
  if(!navigator.geolocation) return showError("Geolokasjon støttes ikke.");
  navigator.geolocation.getCurrentPosition(pos => {
    const {latitude, longitude} = pos.coords;
    fetchWeatherByCoords(latitude, longitude);
  }, () => showError("Kunne ikke hente posisjon."));
});
