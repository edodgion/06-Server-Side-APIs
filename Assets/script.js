var searchBtn = $(".searchBtn")

//Fetch 1  Current Weather
var currentWeatherApi ="http://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}";

fetch(currentWeatherApi).then(function (response) {
  if (response.ok) {
    response.json().then(function (data) {
      displayIssues(data);

    }
  });
};
//Fetch 2 5 Day forcast
var forcastApi = "http://api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}";

fetch(forcastApi).then(function (response) {
  if (response.ok) {
    response.json().then(function (data) {
      displayIssues(data);

    }
  });
};
//Fetch 3 UV
var uvApi = "http://api.openweathermap.org/data/2.5/uvi?lat={lat}&lon={lon}&appid={API key}"

fetch(uvApi).then(function (response) {
  if (response.ok) {
    response.json().then(function (data) {
      displayIssues(data);

    }
  });
};



      for(var i = 0; i < localStorage.lenth; i++) {
        var city = localStorage.getItem(i);
        var displayCity = $(".city").addclass(".cityDisplay")
        displayCity.append("<li>" + city + "</li>")
      };