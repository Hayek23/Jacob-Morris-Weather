const searchBox = document.querySelector('#cityInput');
const submitBtn = document.querySelector('#cityInputButton');
const currentWeather = document.querySelector('#current');
const currentWeatherIcon = document.querySelector('#icon-current');
const temperature = document.querySelector('#temperature');
const humidity = document.querySelector('#humidity');
const wind = document.querySelector('#wind');
const uv = document.querySelector('#uv');
const key = 'ab9f65dea451c4b7f6c92a9815fed957'

const formSubmitHandler = (event) => {
    event.preventDefault();
    let city = searchBox.value.trim();
    searchBox.value = ''

    if(city){
        getCoordinates(city);
    } else {
        return;
    }
}

const getCoordinates = (city) => {
    let api = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${key}`;
    fetch(api)
        .then((res) => {
            console.log(res.json)
            return res.json();
        })
        .then((data) => {
            let lat = (data[0].lat)
            let lon = (data[0].lon)
            getWeather(lat, lon)
        })
        .catch((err) => {
            console.log(err)
        })
}

let getWeather = (lat, lon) => {
    let api = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${key}`;
    fetch(api)
        .then((res, err) => {
            if (res) {
                console.log(res.json)
                return res.json();
            } else{
                console.log(err)
            }
        })
        .then((data) => {
            showWeather(data);
            showForecast(data);
        })
};

let showWeather = (data) => {
    let api = `https://api.openweathermap.org/data/2.5/onecall?lat=${data.lat}&lon=${data.lon}&units=imperial&appid=${key}`;
    let icon = "https://openweathermap.org/img/w/" + data.current.weather[0].icon + ".png"
    fetch(api)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            currentWeatherIcon.innerHTML = '<img src=' + icon + '>';
        })

        wind.innerHTML = 'Wind speed is ' + data.current.wind_speed + 'miles per hour'
        temperature.innerHTML = 'It is ' + data.current.temp + ' degrees outside'
        humidity.innerHTML = 'Humidity is ' + data.current.humidity + '%'
}

let showForecast = (data) => {
    for (i=1; i<6; i++) {
        let current = document.querySelector('day' + i + '-title');
        current.innerHTML = moment().add(i, 'd').format('M/D/YYYY')
        let forecast = document.querySelector("#card" + i);
    }

    for(j=0; j<5; j++){
        let current = data.daily[j]
        let temperature = document.querySelector('#card' + j + '-temperature')
        temperature.innerHTML = 'The temperature on this day will be' + current.temp.day;
        let wind = document.querySelector('#card' + j + '-wind')
        wind.innerHTML = 'Wind speed on this day will be ' + current.wind_speed;
        let humidity = document.querySelector('#card' + j + '-humidity');
        humidity.innerHTML = 'Humidity on this day will be ' +current.humidity + '%';
    }
}
submitBtn.addEventListener('click', formSubmitHandler)