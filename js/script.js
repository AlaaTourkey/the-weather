particlesJS.load('particles-js', 'particles.json', function () {
  console.log('callback - particles.js config loaded');
});

// ============> today variables

let today = document.getElementById("today"),
  todayDateMonth = document.getElementById("today-date-month"),
  cityLocation = document.getElementById("location"),
  todayDegree = document.getElementById("todayDegree"),
  todayIcon = document.getElementById("todayIcon"),
  description = document.getElementById("todayDescription"),
  humidty = document.getElementById("humidty"),
  wind = document.getElementById("wind"),
  compass = document.getElementById("compass"),
  searchBar = document.getElementById("searchBar"),
  currentCity='Tanta',
  responceData;

// ============> nextday variables
let nextDay = document.getElementsByClassName("nextDay"),
  nextDayIcon = document.getElementsByClassName("nextDayIcon"),
  maxDegree = document.getElementsByClassName("maxDegree"),
  minDegree = document.getElementsByClassName("minDegree"),
  nextDayDescription = document.getElementsByClassName("nextDayDescription"),
  monthName = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Spet', 'Oct', 'Nov', 'Dec'],
  days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",];
getData()


// ==============>getData function
async function getData() {
  apiResponce = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=790126e6a09342cfa6a162205232802&q=${currentCity}&days=3`)
  responceData = await apiResponce.json()
  console.log(responceData);
  displayTodayWeather()
  displayNextDayWeather()

}
// =============> today function
let date = new Date();
function displayTodayWeather() {
  today.innerHTML = days[date.getDay()];
  todayDateMonth.innerHTML = `${date.getDay()} ${monthName[date.getMonth()]}`;
  cityLocation.innerHTML = responceData.location.name;
  todayDegree.innerHTML = responceData.current.temp_c;
  todayIcon.setAttribute("src", `https:${responceData.current.condition.icon}`);
  description.innerHTML = responceData.current.condition.text;
  wind.innerHTML = responceData.current.wind_kph
  compass.innerHTML = responceData.current.wind_dir
  humidty.innerHTML = responceData.current.humidity
}


// ===============> next day function
function displayNextDayWeather() {
  for (let i = 0; i < nextDay.length; i++) {

    nextDay[i].innerHTML = days[new Date(responceData.forecast.forecastday[i + 1].date).getDay()];
    nextDayIcon[i].setAttribute("src", `https:${responceData.forecast.forecastday[i + 1].day.condition.icon}`)
    maxDegree[i].innerHTML = responceData.forecast.forecastday[i + 1].day.maxtemp_c;
    minDegree[i].innerHTML = responceData.forecast.forecastday[i + 1].day.mintemp_c;
    nextDayDescription[i].innerHTML = responceData.forecast.forecastday[i + 1].day.condition.text;
  }

}

// ===========> seach input function
searchBar.addEventListener("keyup", function () {
  currentCity = searchBar.value
  getData(currentCity)
})