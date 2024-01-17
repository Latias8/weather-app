document.addEventListener("DOMContentLoaded", () => {
    function getWeather() {
        const apiKey = 'c26865ae4995dab39c17f0c699ee32d5';
        const cities = document.querySelectorAll('.city');
        const promises = [];

        cities.forEach(cityElement => {
            let city = cityElement.id;

            if (!city) {
                alert('Please enter a city');
                return;
            }

            let currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
            let forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

            const currentWeatherPromise = fetch(currentWeatherUrl)
                .then(response => response.json());

            const forecastPromise = fetch(forecastUrl)
                .then(response => response.json());

            promises.push({
                cityElement,
                currentWeatherPromise,
                forecastPromise
            });
        });

        Promise.all(promises.map(promiseObj => promiseObj.currentWeatherPromise))
            .then(currentWeatherResults => {
                promises.forEach((promiseObj, index) => {
                    const currentWeatherData = currentWeatherResults[index];
                    displayWeather(promiseObj.cityElement, currentWeatherData);
                });

                return Promise.all(promises.map(promiseObj => promiseObj.forecastPromise));
            })
            .then(forecastResults => {
                promises.forEach((promiseObj, index) => {
                    const forecastData = forecastResults[index];
                    displayHourlyForecast(promiseObj.cityElement, forecastData);
                });
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                alert('Error fetching data. Please try again.');
            });
    }

    function displayWeather(cityElement, data) {
        let tempDivInfo = cityElement.nextElementSibling.querySelector('.temp-div');
        let weatherInfoDiv = cityElement.nextElementSibling.querySelector('.weather-info');
        let weatherIcon = cityElement.nextElementSibling.querySelector('.weather-icon');

        // Clear previous content
        weatherInfoDiv.innerHTML = '';
        tempDivInfo.innerHTML = '';

        if (data.cod === '404') {
            weatherInfoDiv.innerHTML = `<p>${data.message}</p>`;
        } else {
            let cityName = data.name;
            let temperature = Math.round(data.main.temp - 273.15); // Convert to Celsius
            let description = data.weather[0].description;
            let iconCode = data.weather[0].icon;
            let iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

            let temperatureHTML = `<p>${temperature}°C</p>`;
            let weatherHtml = `<p><strong>${cityName}</strong></p><p>${description}</p>`;

            tempDivInfo.innerHTML = temperatureHTML;
            weatherInfoDiv.innerHTML = weatherHtml;
            weatherIcon.src = iconUrl;
            weatherIcon.alt = description;

            showImage();
        }
    }

    function displayHourlyForecast(cityElement, hourlyData) {
        const hourlyForecastDiv = cityElement.nextElementSibling.querySelector('.hourly-forecast');

        // Clear previous content
        hourlyForecastDiv.innerHTML = '';

        const next24Hours = hourlyData.list.slice(0, 8); // Display the next 24 hours (3-hour intervals)

        next24Hours.forEach(item => {
            const dateTime = new Date(item.dt * 1000); // Convert timestamp to milliseconds
            const hour = dateTime.getHours();
            const temperature = Math.round(item.main.temp - 273.15); // Convert to Celsius
            const iconCode = item.weather[0].icon;
            const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

            const hourlyItemHtml = `
                <div class="hourly-item">
                    <div>${hour}:00</div>
                    <img src="${iconUrl}" alt="Hourly Weather Icon">
                    <div>${temperature}°C</div>
                </div>
            `;

            hourlyForecastDiv.innerHTML += hourlyItemHtml;
        });
    }

    function showImage() {
        const weatherIcon = document.querySelectorAll('.weather-icon');
        weatherIcon.forEach((i) => {
            i.style.display = 'block'; // Make the image visible once it's loaded
        });
    }

    // Call the getWeather function
    getWeather();

    //parallax//

    function castParallax() {
        window.addEventListener("scroll", function (event) {

            let top = this.pageYOffset;
            let scrollTop = window.scrollY;
            /*console.log(scrollTop)*/
            /*console.log(window.innerWidth)*/
            let layers = document.getElementsByClassName("parallax");
            let layer, speed, yPos;
            for (let i = 0; i < layers.length; i++) {
                layer = layers[i];
                speed = layer.getAttribute('data-speed');
                let yPos = -(top * speed / 100);
                layer.setAttribute('style', 'transform: translate3d(0px, ' + yPos + 'px, 0px)');

            }
        })
    }

    function dispelParallax() {
        document.getElementById("parallax").style.display = "none";
        document.querySelectorAll(".parallax").forEach( (i) => {
            i.style.display = "none";
        })}

    function startSite() {

        let platform = navigator.platform.toLowerCase();
        let userAgent = navigator.userAgent.toLowerCase();

        if ( platform.indexOf('ipad') != -1  ||  platform.indexOf('iphone') != -1 )
        {
            dispelParallax();
        }

        else
        {
            castParallax();
        }

    }

    startSite();
    let nineties = true;
    let weatherElements = document.querySelectorAll('.weather-c');
    weatherElements.forEach( (i) => {
        i.style.cssText = 'text-shadow: 0 0 0 rgba(251, 12, 12, 5), 0px 0 0 rgba(12, 79, 251, 4), 0 0 0 rgba(52, 251, 12, 5) !important; animation: still 4500ms ease infinite !important;';
        document.body.style.cssText = 'background: linear-gradient(to bottom, #8C52FF, #8C52FF, #8C52FF, #8C52FF) !important; background-size: 100% 4px !important;';

    })
    document.getElementById("front-filter").style.display = "none"

    document.getElementById("c-but").addEventListener("click", () => {
        if (nineties === false) {
            nineties = true;

            weatherElements.forEach( (i) => {
                i.style.cssText = 'text-shadow: 0 0 0 rgba(251, 12, 12, 5), 0px 0 0 rgba(12, 79, 251, 4), 0 0 0 rgba(52, 251, 12, 5) !important; animation: still 4500ms ease infinite !important;';
                document.body.style.cssText = 'background: linear-gradient(to bottom, #8C52FF, #8C52FF, #8C52FF, #8C52FF) !important; background-size: 100% 4px !important;';

            })
            document.getElementById("front-filter").style.display = "none"
        } else {
            nineties = false;

            weatherElements.forEach((i) => {
                i.style.cssText = 'text-shadow: "" !important; animation: " !important";';
                document.body.style.cssText = 'background: "#8C52FF" !important; background-size: "" !important; animation: "" !important;';
            })
            document.getElementById("front-filter").style.display = "block"
            console.log('off')
        }
    });

    let shown = false;

    document.getElementById("melody-btn").addEventListener("click", () => {
        if (shown === false) {
            document.querySelector(".music-container").style.right = "20px";
            shown = true;
        } else {
            document.querySelector(".music-container").style.right = "-400px";
            shown = false;
        }

    })

    document.querySelector(".col-sm-12").addEventListener("click", () => {
        document.querySelector(".col-sm-12").style.opacity = "0";
        document.querySelector(".col-sm-12").style.pointerEvents = "none";
    })



});
