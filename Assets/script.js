var input = document.querySelector("#enterCity");
var button = document.querySelector("#searchBtn");

var apiKey = "3d440218342a493796fb55b92661ecc1";

for (var i = 0; i < localStorage.length; i++) {
  var city = localStorage.getItem(i);
  var cityName = $(".list-group").addClass("list-group-item");
  cityName.append("<li>" + city + "</li>");
}

var keyCount = 0;

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
      localStorage.setItem(keyCount, input.value);
      keyCount = keyCount + 1;

      if (!response.ok) {
        throw response.json();
      }
      return response.json();
    })

    .then(function printWeatherResults(response) {
      var currentWeather = $(".weatherResults")
        .addClass(".currentWeather")
        .append("<div>");
      currentWeather.empty();
      var weatherResults = currentWeather.append("<p>");
      currentWeather.append(weatherResults);

      var time = new Date(response.dt * 1000);
      weatherResults.append(
        "<p>" + response.name + " " + time.toLocaleDateString("en-US") + "<p>"
      );
      var temp = weatherResults.append("<p>");
      weatherResults.append(temp);
      temp.append(
        "<p>" + "Temperature: " + response.main.temp + " C°" + "</p>"
      );
      temp.append("<p>" + "Humidity: " + response.main.humidity + "%" + "</p>");
      temp.append("<p>" + "Wind Speed: " + response.wind.speed + "</p>");
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
