var searchForm = document.querySelector("#search-form");
var searchTermInput = document.querySelector("#search-term");
var currentWeather = document.querySelector("#current-weather");

//api key
const apiKey = "4c8136706e698d46b243dfd2b9c7d5ac";

searchForm.addEventListener("submit", function(event) {
    event.preventDefault();
    var searchTerm = searchTermInput.value;

    showCurrentWeather(searchTerm);
    showForecast(searchTerm)

    //create a city button
    createCityButton(searchTerm)
});

const createCityButton = (cityName) => {
    //create ciy btn template
    let tempalte = `<button class="city-btn">${cityName}</button>`;

    //add this to the page
    document.querySelector(".city-btn-container").innerHTML = tempalte;

    //add the evenlistener

}

const showCurrentWeather = (cityName) => {
    var urlToFetch = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=${apiKey}`
    fetch(urlToFetch)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        
            var cityH2 = document.createElement("h2");
            cityH2.textContent = data.name;
            currentWeather.append(cityH2);

            var dateH3 = document.createElement("h3");
            dateH3.textContent = new Date().toLocaleDateString();
            currentWeather.append(dateH3);

            var weatherIcon = document.createElement("img");
            weatherIcon.textContent = data.weather[0].icon;
            currentWeather.append(weatherIcon);

            var tempH3 = document.createElement("h3");
            tempH3.textContent = data.main.temp;
            currentWeather.append("Temperature: ", tempH3);

            var humidityH3 = document.createElement("h3");
            humidityH3.textContent = data.main.humidity;
            currentWeather.append("Humidity: ", humidityH3);

            var windH3 = document.createElement("h3");
            windH3.textContent = data.wind.speed;
            currentWeather.append("Windspeed: ", windH3);

        console.log(data);
        console.log(data.name);
        console.log(data.dt);
        console.log(data.weather[0].icon);
        console.log(data.main.temp);
        console.log(data.main.humidity);
        console.log(data.wind.speed);
        
        
      })
}

const showForecast = (cityName) => {
    var urlToFetch = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=imperial&appid=${apiKey}`;
    fetch(urlToFetch)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log("********", data)

        //get all 12pm data
        const filteredData = data.list.filter((datum) => {
            return datum.dt_txt.indexOf("12:00:00") > -1; //boolean
        });

        console.log("*******filtered data: ",filteredData );
        
        //loop through data and build string
        let templateForecast = "";

        filteredData.forEach((datum) => {
            templateForecast += `
                <div>
                    <div>${new Date(datum.dt_txt).toLocaleDateString()}</div>
                    <div class="temp">Temperature: ${datum.main.temp} F</div>
                    <div class="hum">Humidity: ${datum.main.humidity} %</div>
                    <div class="icon"><img src="https://openweathermap.org/img/w/${datum.weather[0].icon}.png"/></div>
                </div>
            `;
        });

        //show the data on the page
        document.querySelector("#forecast div").innerHTML = templateForecast;

      })
}


