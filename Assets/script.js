var searchBtn = $(".searchBtn")
var cityInput = document.querySelector(".enter-city")
//var query = searchParamsArr[0].split('=').pop();
//var format = searchParamsArr[1].split('=').pop();
//API Key goes here
//var format = searchParamsArr[1].split('=').pop();
var apiKey = "f53b75435ff33a915bd8f6e209086b78";

for(var i = 0; i < localStorage.lenth; i++) {
  var city = localStorage.getItem(i);
  var displayCity = $(".list-group").addClass(".list-group-item")

  displayCity.append("<li>" + city + "</li>")
};

var keyCount = 0;

searchBtn.on("click", function(event){
event.preventDefault(); 
  var enterCity = cityInput.value;
  localStorage.setItem(enterCity);

//Fetch 1  Current Weather
fetch("http://api.openweathermap.org/data/2.5/weather?q=" + enterCity + "&appid=f53b75435ff33a915bd8f6e209086b78")
.then(function (response) {
  var displayCity = $(".list-group").addClass("list-group-item")
  displayCity.append("<li>" + response.name + "</li>")

localStorage.setItem(keyCount, response.name)
  keyCount = keyCount + 1;

// Start Current Weather append 
var currentCard = $(".currentCard").append("<div>").addClass("card-body");
currentCard.empty();
var currentName = currentCard.append("<p>");
// .addClass("card-text");
currentCard.append(currentName);

// Adjust Date 
var timeUTC = new Date(response.dt * 1000);
currentName.append(response.name + " " + timeUTC.toLocaleDateString("en-US"));
//currentName.append(`<img src="https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png">`);
// Add Temp 
var currentTemp = currentName.append("<p>");
// .addClass("card-text");
currentName.append(currentTemp);
currentTemp.append("<p>" + "Temperature: " + response.main.temp + "</p>");
// Add Humidity
currentTemp.append("<p>" + "Humidity: " + response.main.humidity + "%" + "</p>");
// // Add Wind Speed: 
currentTemp.append("<p>" + "Wind Speed: " + response.wind.speed + "</p>");

// UV Index URL
var urlUV = `https://api.openweathermap.org/data/2.5/uvi?appid=b8ecb570e32c2e5042581abd004b71bb&lat=${response.coord.lat}&lon=${response.coord.lon}`;

// UV Index
$.ajax({
    url: urlUV,
    method: "GET"
}).then(function (response) {

    var currentUV = currentTemp.append("<p>" + "UV Index: " + response.value + "</p>").addClass("card-text");
    currentUV.addClass("UV");
    currentTemp.append(currentUV);
    // currentUV.append("UV Index: " + response.value);

  });
});
});

