var input = document.querySelector("#enterCity");
var button = document.querySelector("#searchBtn");


var apiKey = "3d440218342a493796fb55b92661ecc1";

for (var i = 0; i < localStorage.length; i++) {

  var city = localStorage.getItem(i);
  // console.log(localStorage.getItem("City"));
  var cityName = $(".list-group").addClass("list-group-item");

  cityName.append("<li>" + city + "</li>");
}

var keyCount = 0;

function handleSearchFormSubmit (event) {
	event.preventDefault();

var searchInputVal = document.querySelector('#enterCity').value;

    if (!searchInputVal) {
        window.alert('Please enter a City to search for...')
    }

    getParams()
}

function getParams (search){
    var search = input.value;
    console.log(search);

    getCurrentWeather(search);
    getfiveDayForcast(search);
}


function getCurrentWeather(search) {
  var urlCurrent = "https://api.openweathermap.org/data/2.5/weather?q=" + (search) + "&appid=" + (apiKey);

    fetch(urlCurrent)
    .then(function (response) {
    console.log(response.ok);
    var cityName = $(".list-group").addClass("list-group-item");
    cityName.append("<li>" + input.value + "</li>");
    localStorage.setItem(keyCount, input.value);
    keyCount = keyCount + 1;

    if (!response.ok) {
        window.alert('Unable to connect');
        throw response.json();
}

return response.json()
})
    .then(function (weatherResults){
        printWeatherResults(weatherResults);
    })

}

function getfiveDayForcast(search) {
  var urlFiveDay = "https://api.openweathermap.org/data/2.5/forecast?q=" + (search) + "&appid=" + (apiKey);

    fetch(urlFiveDay)
    .then(function (response) {
    console.log(response.ok);
    if (!response.ok) {
        window.alert('Unable to connect');
        throw response.json();
}

return response.json()
})
    .then(function (forecastResults){
        printForecastResults(forecastResults);
    })

}

function printForecastResults(forecastResults){
    console.log(forecastResults);
    var forecast = document.querySelector('.5dayForcast');
    forecast.innerText = urlFiveDay.forecast[0].city.value;
    
}

function printWeathertResults (weatherResults){
    console.log(weatherResults);
	}	

  button.addEventListener('click', handleSearchFormSubmit);