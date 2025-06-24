const apiKey = "apa y";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const weatherIcon = document.querySelector(".weather-icon");

const cityElem = document.querySelector(".city");
const tempElem = document.querySelector(".temp");
const humidityElem = document.querySelector(".humadity");
const windElem = document.querySelector(".wind");

async function checkWeather(city) {
  if (!city) {
    alert("Masukkan nama kota dulu.");
    return;
  }

  try {
    const response = await fetch(`${apiUrl}${encodeURIComponent(city)}&appid=${apiKey}&lang=id`);

    if (!response.ok) throw new Error("Kota tidak ditemukan.");

    const data = await response.json();

    cityElem.textContent = data.name;
    tempElem.textContent = Math.round(data.main.temp) + "°C";
    humidityElem.textContent = data.main.humidity + "%";
    windElem.textContent = data.wind.speed + " km/h";

    const weather = data.weather[0].main;
    switch (weather) {
      case "Clouds":
        weatherIcon.src = "images/clouds.png";
        break;
      case "Clear":
        weatherIcon.src = "images/clear.png";
        break;
      case "Rain":
        weatherIcon.src = "images/rain.png";
        break;
      case "Drizzle":
        weatherIcon.src = "images/drizzle.png";
        break;
      case "Mist":
        weatherIcon.src = "images/mist.png";
        break;
      default:
        weatherIcon.src = "images/default.png";
    }

  } catch (error) {
    alert(error.message);
    cityElem.textContent = "--";
    tempElem.textContent = "--°C";
    humidityElem.textContent = "--%";
    windElem.textContent = "-- km/h";
    weatherIcon.src = "images/default.png";
  }
}

searchButton.addEventListener("click", () => {
  checkWeather(searchInput.value.trim());
});

searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    checkWeather(searchInput.value.trim());
  }
});