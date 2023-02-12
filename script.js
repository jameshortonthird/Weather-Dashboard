// var apikey = 339ca470cb3565cbcc94ce92292b13d9
var cityText = document.getElementById("cityText")
var searchButton = document.getElementById("searchButton")
var savedCityText = document.getElementById("savedCityText")
var currentDayCard = document.getElementById("currentDayCard")

searchButton.addEventListener("click", searchCity)

function searchCity(event) {
    event.preventDefault();
    
    var nameOfCity = cityText.value.trim();
    
    if (nameOfCity) {
        saveCity();
        findCity(nameOfCity);
        console.log(nameOfCity);
        reset();
    } else {
        alert("enter a city name")
    }
}




// function formatCurrentCard(weather) {
//     console.log ("Today's Weather")
//     console.log (weather);
    
//     currentDayCard.innerHTML = "";

//     currentDayCard.innerHTML += `
//     <div class="card-body">
//     <p class="card-text"> $`
// }