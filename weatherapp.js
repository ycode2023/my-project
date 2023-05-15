function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let dayWeather = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayWeather];
  return `${day} ${hours}:${minutes}`;
}

function search(city) {
  let apiKey = "733dfaa98425c3e233718439f77dabb3";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(showDescription);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  search(city);
}

function showDescription(response) {
  document.querySelector("h2").innerHTML = response.data.name;
  let tempDegree = Math.round(response.data.main.temp);
  let temp = document.querySelector("#degree");
  temp.innerHTML = `${tempDegree}°C`;
  let tempConditions = response.data.weather[0].description;
  let cond = document.querySelector("#conditions");
  cond.innerHTML = `${tempConditions}`;
}

function showLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "733dfaa98425c3e233718439f77dabb3";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(showDescription);
}

function showCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showLocation);
}

let dateElement = document.querySelector("#date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

search("London");

let citySearch = document.querySelector("#search-form");
citySearch.addEventListener("submit", handleSubmit);

let button2 = document.querySelector("#button2");
button2.addEventListener("click", showCurrentLocation);
