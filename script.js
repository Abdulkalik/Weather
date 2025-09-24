const demoWeather = {
  Oslo: { temp: 15, desc: "sol og lettskyet" },
  Bergen: { temp: 12, desc: "regn og skyer" },
  Tromsø: { temp: 5, desc: "snø og kaldt" }
};

const cityInput = document.getElementById("cityInput");
const fetchBtn = document.getElementById("fetchBtn");
const result = document.getElementById("result");

// Funksjon: vis vær basert på by
function showWeather(city) {
  const data = demoWeather[city];
  if (!data) {
    result.innerHTML = `<p>Ingen værdata for <b>${city}</b>.</p>`;
    return;
  }

  result.innerHTML = `
    <h2>${city}</h2>
    <p><b>Temperatur:</b> ${data.temp}°C</p>
    <p><b>Vær:</b> ${data.desc}</p>
  `;
}

// Når bruker trykker på knappen
fetchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (!city) {
    result.innerHTML = "<p>Skriv inn en by.</p>";
    return;
  }
  showWeather(city);
});
