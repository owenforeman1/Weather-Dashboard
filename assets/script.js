var APIKey = "bc4cde8c4ce64536e7377d99166a9442";

var citySearch = document.getElementById("searchBtn");
if (citySearch.addEventListener) {
  citySearch.addEventListener("click", weatherCall, false);
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

      
      futureWeather(lat, lon);
    });
}

function futureWeather(lat, lon) {
  var city = document.querySelector("#enterCity").value;

  var fiveDay = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${APIKey}&cnt=5`;

  fetch(fiveDay)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var dailyArray = data.daily;
      const slicedArray = dailyArray.slice(0, 5);
      cardDisplay(slicedArray);
      console.log(data);
    });
}

function cardDisplay(dailyArray) {
  
  for (var i = 0; i < 5; i++) {
    console.log(dailyArray[i]);

    var dateString = moment.unix(dailyArray[i].dt).format("MM/DD/YYYY");
    
    var dayTemp = dailyArray[i].temp.day
   
    var dayWind = dailyArray[i].wind_speed;
    
    var dayHumidity = dailyArray[i].humidity;
    
    var putCardContent = $("#card" + i)
    

    putCardContent.children().children().eq(0).text(dateString);
    putCardContent.children().children().eq(1).;
    putCardContent.children().children().eq(2).text(`Temp: ${dayTemp}  °F`);
    putCardContent.children().children().eq(3).text(`Wind: ${dayWind} Mph`);
    putCardContent.children().children().eq(4).text(`Humidity: ${dayHumidity} %`);
  }
  console.log(dailyArray);
  
}



// function to have recent searches/local storage
// function to display info on cards


// https:api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
// <p>Temperature: ${cityWeatherResponse.main.temp} °F</p>

//api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
