// import React, { useState, useEffect } from 'react';
// // import InfiniteScroll from "react-infinite-scroll-component";
// import PropTypes from 'prop-types';

// // WeatherItem Component to display individual weather data
// const WeatherItem = ({ cityName, temperature, description }) => {
//     return (
//         <div className="weather-item">
//             <h3>{cityName}</h3>
//             <p>Temperature: {temperature}°C</p>
//             <p>Weather: {description}</p>
//         </div>
//     );
// };

// // Main Weather Component
// const Weather = ({ initialCity, apiKey }) => {
//     const [city, setCity] = useState(initialCity);
//     const [weatherData, setWeatherData] = useState(null);
//     const [loading, setLoading] = useState(false);

//     const fetchWeatherData = async () => {
//         try {
//             setLoading(true);
//             const response = await fetch(
//                 `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
//             );
//             const data = await response.json();
//             if (data.cod === 200) {
//                 setWeatherData(data);
//             } else {
//                 console.error("City not found or other error");
//             }
//             setLoading(false);
//         } catch (error) {
//             console.error("Error fetching weather data:", error);
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchWeatherData();
//         document.title = `${city} Weather - WeatherApp`;
//     }, [city]);

//     return (
//         <div className="container weather-container">
//             <h1 className="text-center">Weather Information for {city}</h1>
//             <input
//                 type="text"
//                 placeholder="Enter city"
//                 value={city}
//                 onChange={(e) => setCity(e.target.value)}
//             />
//             <button onClick={() => fetchWeatherData()}>Get Weather</button>

//             <h2>^C</h2>

//             {loading && <h4>Loading...</h4>}

//             {weatherData && !loading && (
//                 <div className="row">
//                     <div className="col-md-4">
//                         <WeatherItem
//                             cityName={weatherData.name}
//                             temperature={Math.round(weatherData.main.temp - 273.15)}
//                             description={weatherData.weather[0].description}
//                         />
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// // Default props for Weather component
// Weather.defaultProps = {
//     initialCity: "London",
//     apiKey: "YOUR_API_KEY"  // Replace with your actual API key
// };

// // Prop types validation for Weather component
// Weather.propTypes = {
//     initialCity: PropTypes.string,
//     apiKey: PropTypes.string.isRequired
// };

// export default Weather;



import React, { useState } from 'react';

const WeatherApp = () => {
    const [city, setCity] = useState(''); // State to hold city input
    const [weatherData, setWeatherData] = useState(null); // State to hold weather data
    const [loading, setLoading] = useState(false); // State to manage loading status
    const apiKey = '8b567e585cd23efdb5874aac16092fb8'; // Replace with your actual API key

    const getWeather = async () => {
        if (!city) return; // If city input is empty, do nothing
        setLoading(true); // Set loading state to true

        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
            const data = await response.json();
            setWeatherData(data); // Store the retrieved weather data in state
        } catch (error) {
            console.error("Error fetching weather data:", error); // Log any errors
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    const getTemperatureEmoji = (temp) => {
        if (temp > 30) return "☀️"; // Sun for hot weather
        if (temp < 10) return "❄️"; // Snowflake for cold weather
        return "🌤️"; // Partly cloudy as default
    };

    const getHumidityEmoji = (humidity) => {
        if (humidity > 20) return "💧"; // Droplet for high humidity
        return "🌬️"; // Wind emoji for lower humidity
    };

    const getWindSpeedEmoji = (speed) => {
        if (speed > 1) return "🌪️"; // Tornado for high wind speed
        return "🌬️"; // Wind emoji for lower wind speed
    };

    const getCloudCoverageEmoji = (clouds) => {
        if (clouds > 1) return "☁️"; // Cloud emoji for cloudy weather
        return "🌤️"; // Partly cloudy as default
    };

    return (
        <div className="weather-container">
            {/* <div className='weather-container2'> */}
            <h1>Weather Information</h1>
            <input
                type="text"
                placeholder="Enter city"
                value={city}
                onChange={(e) => setCity(e.target.value)} // Update city state on input change
            />
            <button onClick={getWeather}>Get Weather</button> {/* Button to fetch weather data */}

            {loading && <h4>Loading...</h4>} {/* Loading message */}

            {weatherData && !loading && (
                <div className="weather-info">
                    <h2>{weatherData.name}</h2> {/* City name */}
                    <p>Temperature: {Math.round(weatherData.main.temp)}°C{getTemperatureEmoji(weatherData.main.temp)}</p> {/* Temperature */}
                    <p>Humidity: {weatherData.main.humidity}%{getHumidityEmoji(weatherData.main.humidity)}</p> {/* Humidity */}
                    <p>Wind Speed: {weatherData.wind.speed} m/s{getWindSpeedEmoji(weatherData.wind.speed)}</p> {/* Wind speed */}
                    <p>Cloud Coverage: {weatherData.clouds.all}%{getCloudCoverageEmoji(weatherData.clouds.all)}</p> {/* Cloud coverage */}
                </div>
            )}
        </div>
        // </div>
    );
};

export default WeatherApp;
