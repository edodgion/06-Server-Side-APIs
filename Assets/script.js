var input = document.querySelector("#enterCity");
var button = document.querySelector("#searchBtn");

//api Key
var apiKey = "3d440218342a493796fb55b92661ecc1";

//loop for city list
for (var i = 0; i < localStorage.length; i++) {
  var city = localStorage.getItem(i);
  var cityName = $(".list-group").addClass("list-group-item");
  cityName.append("<li>" + city + "</li>");
}
//input value tied to click event
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
//current weather API and fetch
function getCurrentWeather(search) {
  var currentApi = `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${apiKey}&units=metric`;

  fetch(currentApi)
  .then(function (response) {
    var cityName = $(".list-group").addClass("list-group-item");
    cityName.append("<li>" + input.value + "</li>");
    localStorage.setItem(i, input.value);


    if (!response.ok) {
      throw response.json();
    }
    return response.json();
  })
//print card with results of selected attibutes
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
//5 day forecast API
function getfiveDayForcast(search) {
  var fiveDayApi = `https://api.openweathermap.org/data/2.5/forecast?q=${search}&appid=${apiKey}&units=metric`;

  fetch(fiveDayApi)
    .then(function (response) {
      if (!response.ok) {
        throw response.json();
      }

      return response.json();
    })
    
    .then(function printForecastResults(response) {
      var forecast = $(".forecast").append("<div>").addClass(".card-body");
      forecast.empty();
      var currentForecast = forecast.append("<p>");
      forecast.append(currentForecast);
      
      //days within week Array
        var day = [0, 8, 16, 24, 32];
        
        // For each for 5 days
        day.forEach(function (i) {
            var FiveDayTimeUTC1 = new Date(response.list[i].dt * 1000);
            FiveDayTimeUTC1 = FiveDayTimeUTC1.toLocaleDateString("en-US");
//print cards with results of selected attibutes
            forecast.append("<div class=fiveDayForecast>" + 
            "<p>" + FiveDayTimeUTC1 + "</p>" + 
            `<img src="https://openweathermap.org/img/wn/${response.list[i].weather[0].icon}@2x.png">` + 
            "<p>" + "Temperature: " + response.list[i].main.temp + "</p>" + 
            "<p>" + "Humidity: " + response.list[i].main.humidity + "%" + "</p>" + 
            "<p>" + "Wind Speed: " + response.list[i].wind.speed + "</p>" + "</div>")


        })

    });

    
  };


button.addEventListener("click", handleSearchFormSubmit);
