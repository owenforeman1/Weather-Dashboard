
var APIKey = "bc4cde8c4ce64536e7377d99166a9442";




 

var citySearch = document.getElementById("searchBtn");
  if (citySearch.addEventListener) {
    citySearch.addEventListener("click", weatherCall, false)
  } 


function weatherCall() {
var city = document.querySelector("#enterCity").value;

var queryURL =
  "https://api.openweathermap.org/geo/1.0/direct?q=" +
  city +
  "&units=imperial&appid=" +
  APIKey;

  fetch(queryURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var lat = data[0].lat;
      var lon = data[0].lon;

      // var temp = data.main.temp;
      // var humidity = data.main.humidity;
      // var wind = data.wind.speed;

      console.log(data[0]);
      futureWeather(lat, lon);
    });
    console.log("after api call");
}

function futureWeather(lat, lon) {
  var city = document.querySelector("#enterCity").value;

  var fiveDay =
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${APIKey}&cnt=5`

  fetch(fiveDay)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var dailyArray = data.daily;
      const slicedArray = dailyArray.slice(0, 5);
      console.log(slicedArray);
      // var temp = data.main.temp;
      // var humidity = data.main.humidity;
      // var wind = data.wind.speed;
      console.log(data);
    });
}

// lat lon for five day
//
// function to search when clicked
// function to have recent searches/local storage
// function to display info on cards
// function for api call


// https:api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
// <p>Temperature: ${cityWeatherResponse.main.temp} °F</p>

//api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}