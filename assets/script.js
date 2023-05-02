var cityName;

function getCityWeather(cityName) {
    var weatherURL = "https://api.openweathermap.org/data/2.5/forecast?appid=f4966cd8509c2559490287621f4830a8&units=imperial&q=" + cityName

    fetch (weatherURL)
        .then (function (response) {
            if (!response.ok) {
                throw response.json();
            }
            return response.json();
        })
        .then(function (cityWeather) {
            console.log("cityWeather", cityWeather);

            if (!cityWeather) {
                console.log("No results found!");
            } else {
                printCityInfo(cityWeather);
                for (var i=0; i < 10; i++) {
                printForecast(cityWeather.list[i]);
               }
            }
        })
}

var searchForm = document.querySelector("#searchForm");

function handleSearchSubmit(event) {
    event.preventDefault();
    var searchInputVal = document.querySelector ('#userInput').value;
    console.log("city name", searchInputVal);


    if (!searchInputVal) {
        console.error('You need a search input value!');
        console.log(console.error);
        return;
    }
    getCityWeather(searchInputVal);

    // clear generated cityInfo and forecast divs
}

searchForm.addEventListener('submit', handleSearchSubmit);

var cityInfo = document.querySelector("#cityInfo")

function printCityInfo(resultObj) {
    console.log(resultObj);

    var cityName = document.createElement('h2');
    cityName.classList.add('cityName');
    cityName.textContent = "Showing results for: " + resultObj.city.name + ", " + resultObj.city.country;

    cityInfo.append(cityName); 
}

var forecast = document.querySelector("#forecast");

function printForecast(resultObj) {

    var forecastDiv = document.createElement('div');
    forecastDiv.setAttribute('class', "forecastDiv");

    var forecast1Date = document.createElement('h3');
    forecast1Date.textContent = resultObj.dt_txt;
    forecastDiv.append(forecast1Date);
   
  
    var temp = document.createElement('h2');
    temp.textContent = resultObj.main.temp + "°F";
    forecastDiv.append(temp);

    var description = document.createElement('h3');
    description.textContent = resultObj.weather[0].description;
    forecastDiv.append(description);

    var icon = document.createElement('img');
    var iconCode = resultObj.weather[0].icon;
    var iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";
    icon.setAttribute('src', iconUrl);
    forecastDiv.append(icon);


    var humidity = document.createElement('p');
    humidity.textContent = "Humidity: " + resultObj.main.humidity;
    forecastDiv.append(humidity);

    var windSpeed = document.createElement('p');
    windSpeed.textContent = "Windspeed: " + resultObj.wind.speed;
    forecastDiv.append(windSpeed);

    forecast.append(forecastDiv);
    
    // save divs to local storage
}