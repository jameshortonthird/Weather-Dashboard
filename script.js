// var apikey = 339ca470cb3565cbcc94ce92292b13d9
const cityText = document.getElementById("cityText");
const searchButton = document.getElementById("searchButton");
const savedCityText = document.getElementById("savedCityText");
var currentDayCard = document.getElementById("currentDayCard");
var fiveDayForecastCard = document.getElementById("fiveDayForecast");

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

// Function to format 5 day forecast card
function formatFiveDayForecast(weatherArr) {
  console.log("Format Five Day Forecast");
  console.log(weatherArr);

  fiveDayForecastCard.innerHTML = "<div class='col-sm-10 col-lg-1'></div>";
  for (let i = 0; i < weatherArr.length; i++) {
    fiveDayForecastCard.innerHTML += `
    <div class="col-sm-10 col-lg-2">
    <div class="card five">
    <div class="card-body">
    <p class="card-text"> ${weatherArr[i].dt_txt} </p>
    <img src= https://openweathermap.org/img/wn/${weatherArr[i].weather[0].icon}@2x.png></img>
    <p class="card-text"> Weather: ${weatherArr[i].weather[0].main}</p>
    <p class="card-text"> Description: ${weatherArr[i].weather[0].description}</p>
    <p class="card-text"> Temperature: ${weatherArr[i].main.temp}</p>
    </div>
    </div>
    </div>
    `;
  }
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
    alert("Enter a City Name");
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
      fetch(newUrl)
        .then(function (response) {
          console.log(response.statusText);
          if (!response.ok) {
            throw new Error(response.statusText);
          } else {
            return response.json();
          }
        })
        .then(function (weather) {
          console.log(weather.list);
          todayCardFormatter(weather.list[0]);

          var fiveDayForecast = [];
          for (let i = 6; i < weather.list.length; i += 8) {
            fiveDayForecast.push(weather.list[i]);
          }
          formatFiveDayForecast(fiveDayForecast);
        });
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
