

var city = "Paris";
var APIKey = "bc4cde8c4ce64536e7377d99166a9442";
var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

fetch(queryURL) 
.then(function (response){
  return response.json();
})
.then(function (data){



  
  console.log(data);
})


// lat lon for five day
// 
// function to search when clicked
// function to have recent searches/local storage
// function to display info on cards
// function for api call
