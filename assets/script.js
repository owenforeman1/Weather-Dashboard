// apikey
var APIKey = "11d51d57f744cfdc856d2f6021764bca";
// search button
var citySearch = document.getElementById("searchBtn");
if (citySearch.addEventListener) {
  citySearch.addEventListener("click", getCitySearch, false);
}
// displays recent searches
function displayRecentSearch(params) {
  var cityArray = JSON.parse(localStorage.getItem("recentSearch"));
  $("#recentSearches").empty();
  // get recent search element, remove all buttons inside
  for (var i = 0; i < cityArray.length; i++) {
    var recentSearchBtn = document.createElement("button");
    recentSearchBtn.classList.add("btn", "btn-primary", "btn-block");
    recentSearchBtn.innerText = cityArray[i];
    recentSearchBtn.onclick = function () {
      weatherCall(this.innerText);
      return false;
    };
    document.getElementById("recentSearches").appendChild(recentSearchBtn);
  }
}
displayRecentSearch();

// make a new function that only handkles what line 22 does then bind to searchclick
// gets the city you typed in
function getCitySearch() {
  var city = document.querySelector("#enterCity").value;
  weatherCall(city);
}
// calls for the weather
function weatherCall(cityName) {
  var queryURL =
    "https://api.openweathermap.org/geo/1.0/direct?q=" +
    cityName +
    "&units=imperial&appid=" +
    APIKey;

  fetch(queryURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var lat = data[0].lat;
      var lon = data[0].lon;
      futureWeather(lat, lon);
    });

  console.log(cityName);
  var recentSearchArray = JSON.parse(localStorage.getItem("recentSearch"));
  if (recentSearchArray === null) {
    recentSearchArray = [];
  }
  recentSearchArray.push(cityName);
  console.log(recentSearchArray);
  var uniqueArray = recentSearchArray.filter(function (item, pos) {
    return recentSearchArray.indexOf(item) == pos;
  });
  localStorage.setItem("recentSearch", JSON.stringify(uniqueArray));

  displayRecentSearch();
}
// gets future weather
function futureWeather(lat, lon) {
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

// puts weather info on future cards
function cardDisplay(dailyArray) {
  for (var i = 0; i < 5; i++) {
    console.log(dailyArray[i]);

    var dateString = moment.unix(dailyArray[i].dt).format("MM/DD/YYYY");

    var dayIcon = dailyArray[i].weather[0].icon;

    var iconURL = `http://openweathermap.org/img/wn/${dayIcon}.png`;
    console.log(iconURL);

    var dayTemp = dailyArray[i].temp.day;

    var dayWind = dailyArray[i].wind_speed;

    var dayHumidity = dailyArray[i].humidity;

    var putCardContent = $("#card" + i);

    putCardContent.children().children().eq(0).text(dateString);
    putCardContent.children().children().eq(1)[0].src = iconURL;
    putCardContent.children().children().eq(2).text(`Temp: ${dayTemp}  °F`);
    putCardContent.children().children().eq(3).text(`Wind: ${dayWind} Mph`);
    putCardContent
      .children()
      .children()
      .eq(4)
      .text(`Humidity: ${dayHumidity} %`);
  }
}

//puts current weather on main card
function currentWeather(currentObject) {
  var dateString = moment.unix(currentObject.current.dt).format("MM/DD/YYYY");
  console.log(currentObject);
  var dayIcon = currentObject.current.weather[0].icon;

  var dayTemp = currentObject.current.temp;

  var dayWind = currentObject.current.wind_speed;

  var dayHumidity = currentObject.current.humidity;

  var uvIndex = currentObject.current.uvi;

  var putMainCardContent = $("#cardMain");

  putMainCardContent.children().children().eq(0).text(dateString);
  var iconURL = `http://openweathermap.org/img/wn/${dayIcon}.png`;
  console.log(iconURL);
  putMainCardContent.children().children().eq(1)[0].src = iconURL;
  putMainCardContent.children().children().eq(2).text(`Temp: ${dayTemp} °F`);
  putMainCardContent.children().children().eq(3).text(`Wind: ${dayWind} Mph`);
  putMainCardContent
    .children()
    .children()
    .eq(4)
    .text(`Humidity: ${dayHumidity} %`);
  putMainCardContent.children().children().eq(5).text("UV Index: ");
  putMainCardContent.children().children().eq(6).text(` ${uvIndex}`);

  // determines uvi color
  if (uvIndex <= 2) {
    putMainCardContent
      .children()
      .children()
      .eq(6)
      .css("background-color", "#3EA72D")
      .css("color", "white");
  } else if (uvIndex <= 5) {
    putMainCardContent
      .children()
      .children()
      .eq(6)
      .css("background-color", "#FFF300")
      .css("color", "black");
  } else if (uvIndex <= 7) {
    putMainCardContent
      .children()
      .children()
      .eq(6)
      .css("background-color", "#F18B00")
      .css("color", "black");
  } else if (uvIndex <= 10) {
    putMainCardContent
      .children()
      .children()
      .eq(6)
      .css("background-color", "#E53210")
      .css("color", "white");
  } else {
    putMainCardContent
      .children()
      .children()
      .eq(6)
      .css("background-color", "#B567A4")
      .css("color", "white");
  }
}
