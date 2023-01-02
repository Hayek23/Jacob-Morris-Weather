const searchBox = document.getElementById('cityInput');
const submitBtn = document.getElementById('cityInputButton');
const apiKey = 'efc693abd192802e32ec5e23919e5afe'

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
    let api = "https://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=" + apiKey;
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
    let api = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + apiKey;
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
}

submitBtn.addEventListener('click', formSubmitHandler)