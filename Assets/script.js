var input = document.querySelector("#enterCity");
var button = document.querySelector("#searchBtn");

var apiKey = "3d440218342a493796fb55b92661ecc1";

for (var i = 0; i < localStorage.length; i++) {
  var city = localStorage.getItem(i);
  var cityName = $(".list-group").addClass("list-group-item");
  cityName.append("<li>" + city + "</li>");
}

function handleSearchFormSubmit(event) {
  event.preventDefault();

  var searchInputVal = document.querySelector("#enterCity").value;

  if (!searchInputVal) {
    window.alert("Please enter a City to search for...");
  }

  getParams();
}

function getParams(search) {
  var search = input.value;
  console.log(search);

  getCurrentWeather(search);
  getfiveDayForcast(search);
}

function getCurrentWeather(search) {
  var urlCurrent = `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${apiKey}&units=metric`;

  fetch(urlCurrent)
    .then(function (response) {
      console.log(response.ok);
      var cityName = $(".list-group").addClass("list-group-item");
      cityName.append("<li>" + input.value + "</li>");
      localStorage.setItem(i, input.value);
  

      if (!response.ok) {
        throw response.json();
      }
      return response.json();
    })

    .then(function printWeatherResults(response) {
      var currentWeather = $(".weatherResults")
        .addClass(".card-body")
        .append("<div>");
      currentWeather.empty();
      var weatherResults = currentWeather.append("<p>");
      currentWeather.append(weatherResults);

      var time = new Date(response.dt * 1000);
      weatherResults.append("<div class=currentWeather>" + "<p>" + response.name + " " + time.toLocaleDateString("en-US") + "<p>" + `<img src="https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png">` + 
      "<p>" + "Temperature: " + response.main.temp + " C°" + "</p>" + 
      "<p>" + "Humidity: " + response.main.humidity + "%" + "</p>" + 
      "<p>" + "Wind Speed: " + response.wind.speed + "</p>" + "</div>");
      var temp = weatherResults.append("<p>");
      weatherResults.append(temp);
    });
}

function getfiveDayForcast(search) {
  var urlFiveDay = `https://api.openweathermap.org/data/2.5/forecast?q=${search}&appid=${apiKey}&units=metric`;

  fetch(urlFiveDay)
    .then(function (response) {
      console.log(response.ok);
      if (!response.ok) {
        throw response.json();
      }

      return response.json();
    })
    .then(function printForecastResults(forecastResults) {
      console.log(forecastResults);
      var forecast = $(".5dayForecast").append("<div>").addClass(".card-body");
      forecast.empty();
      var currentForecast = forecast.append("<p>");
      forecast.append(currentForecast);
    });
}

button.addEventListener("click", handleSearchFormSubmit);
