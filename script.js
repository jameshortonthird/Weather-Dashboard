// var apikey = 339ca470cb3565cbcc94ce92292b13d9
const cityText = document.getElementById("cityText");
const searchButton = document.getElementById("searchButton");
const savedCityText = document.getElementById("savedCityText");
var currentDayCard = document.getElementById("currentDayCard");

// Function to format current card for current day forecast 
function todayCardFormatter(weather) {
    console.log("Today's Card Formatter");
    console.log(weather);

    currentDayCard.innerHTML = "";
    currentDayCard.innerHTML += `
    <div class="card-body">
        <p class="card-text"> ${weather.dt_txt} </p>
        <img src= https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png></img>
        <p class="card-text"> Weather: ${weather.weather[0].main}</p>
        <p class="card-text"> Description: ${weather.weather[0].description}</p>
        <p class="card-text"> Temperature: ${weather.main.temp}</p>

    </div>`;
}

searchButton.addEventListener("click", searchCity);

function searchCity(event) {
  event.preventDefault();

  const nameOfCity = cityText.value.trim();

  if (nameOfCity) {
    // saveCity();
    findCity(nameOfCity);
    console.log(nameOfCity);
    reset();
  } else {
    alert("enter a city name");
  }
}
// Function to call the location api
var findCity = function (cityFinder) {
  var url =
    "https://api.openweathermap.org/geo/1.0/direct?q=" +
    cityFinder +
    "&limit=1&appid=339ca470cb3565cbcc94ce92292b13d9";
  console.log(url);
  fetch(url)
    .then(function (response) {
      console.log(response.statusText);
      if (!response.ok) {
        throw new Error(response.statusText);
      } else {
        return response.json();
      }
    })
// Function to put the results in the weather api and display them correctly on card for current day forecast and 5 day forecast
    .then(function (location) {
      console.log(location);
      var lat = location[0].lat;
      var lon = location[0].lon;
      var newUrl =
        "https://api.openweathermap.org/data/2.5/forecast?lat=" +
        lat +
        "&lon=" +
        lon +
        "&appid=339ca470cb3565cbcc94ce92292b13d9" +
        "&units=imperial";
      console.log(newUrl);
      fetch(newUrl).then(function (response) {
        console.log(response.statusText);
        if(!response.ok) {
            throw new Error(response.statusText);
        } else {
            return response.json();

        }
      })
      .then(function (weather){
        console.log(weather.list)
        todayCardFormatter(weather.list[0]);
      })
    });
};

// function formatCurrentCard(weather) {
//     console.log ("Today's Weather")
//     console.log (weather);

//     currentDayCard.innerHTML = "";

//     currentDayCard.innerHTML += `
//     <div class="card-body">
//     <p class="card-text"> $`
// }
