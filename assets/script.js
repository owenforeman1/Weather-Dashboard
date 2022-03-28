var APIKey = "bc4cde8c4ce64536e7377d99166a9442";

var citySearch = document.getElementById("searchBtn");
if (citySearch.addEventListener) {
  citySearch.addEventListener("click", weatherCall, false);
}


function displayRecentSearch(params) {
    var cityArray = JSON.parse(localStorage.getItem("recentSearch"));
    $("#recentSearches").empty();
    // get recent search element, remove all buttons inside
    for (var i = 0; i < cityArray.length; i++) {
      var recentSearchBtn = document.createElement("button");
      recentSearchBtn.classList.add("btn", "btn-primary", "btn-block");
      recentSearchBtn.innerText = cityArray[i];
      document.getElementById("recentSearches").appendChild(recentSearchBtn);
    }
    
    
  };
displayRecentSearch();



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

    console.log(city);
    var recentSearchArray = JSON.parse(localStorage.getItem("recentSearch"));
    if (recentSearchArray === null) {
      recentSearchArray = [];
    }
    recentSearchArray.push(city);
    console.log(recentSearchArray);
    var uniqueArray = recentSearchArray.filter(function (item, pos) {
       return recentSearchArray.indexOf(item) == pos;
     });
    localStorage.setItem("recentSearch", JSON.stringify(uniqueArray) )
    
displayRecentSearch();
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
      currentWeather(data);
      console.log(data);
    });
}

function cardDisplay(dailyArray) {
  
  for (var i = 0; i < 5; i++) {
    console.log(dailyArray[i]);

    var dateString = moment.unix(dailyArray[i].dt).format("MM/DD/YYYY");
    
    var dayIcon;

    var dayTemp = dailyArray[i].temp.day
   
    var dayWind = dailyArray[i].wind_speed;
    
    var dayHumidity = dailyArray[i].humidity;
    
    var putCardContent = $("#card" + i)
    

    putCardContent.children().children().eq(0).text(dateString);
    // putCardContent.children().children().eq(1).
    putCardContent.children().children().eq(2).text(`Temp: ${dayTemp}  °F`);
    putCardContent.children().children().eq(3).text(`Wind: ${dayWind} Mph`);
    putCardContent.children().children().eq(4).text(`Humidity: ${dayHumidity} %`);
    
    
  }
  console.log(dailyArray);
}

function currentWeather(currentObject) {
  console.log("-------");
console.log(currentObject);
  var dateString = moment.unix(currentObject.current.dt).format("MM/DD/YYYY");

  var dayIcon;

  var dayTemp = currentObject.current.temp;


  var dayWind = currentObject.current.wind_speed;

  var dayHumidity = currentObject.current.humidity;

  var uvIndex = currentObject.current.uvi;

  var putMainCardContent = $("#cardMain")

putMainCardContent.children().children().eq(0).text(dateString)
putMainCardContent.children().children().eq(1).text(dayIcon);
putMainCardContent.children().children().eq(2).text(`Temp: ${dayTemp} °F`);
putMainCardContent.children().children().eq(3).text(`Wind: ${dayWind} Mph`);
putMainCardContent.children().children().eq(4).text(`Humidity: ${dayHumidity} %`);
putMainCardContent.children().children().eq(5).children().eq(0).text(` ${uvIndex}`)


if (uvIndex <= 2 ) {
  putMainCardContent.children().children().eq(5).children().eq(0).css("background-color", "#3EA72D").css("color", "white");
} else if (uvIndex <= 5) {
   putMainCardContent.children().children().eq(5).children().eq(0).css("background-color","#FFF300").css("color", "black");
}else if (uvIndex <= 7) {
   putMainCardContent.children().children().eq(5).children().eq(0).css("background-color", "#F18B00").css("color", "black");
}else if (uvIndex <= 10) {
   putMainCardContent.children().children().eq(5).children().eq(0).css("background-color", "#E53210").css("color", "white")
}else {
  putMainCardContent.children().children().eq(5).children().eq(0).css("background-color", "#B567A4").css("color", "white")
}

;}


// function to have recent searches/local storage
// function to display info on cards


// https:api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
// <p>Temperature: ${cityWeatherResponse.main.temp} °F</p>

//api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
