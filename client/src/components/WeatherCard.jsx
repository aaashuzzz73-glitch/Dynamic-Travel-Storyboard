import { useState } from "react";
import { CloudSun, CloudRain, Sun } from "lucide-react";
import {
  getCoordinates,
  getWeather,
  getActivitySuggestion,
} from "../services/weatherservice";

const WeatherCard = ({ destination }) => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    try {
      setLoading(true);
      setError("");

      const place = await getCoordinates(destination);

      const data = await getWeather(
        place.latitude,
        place.longitude
      );

      setWeather({
        place: place.name,
        daily: data.daily,
      });
    } catch (err) {
      setError(err.message || "Unable to fetch weather.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="weather-card">
      <div className="weather-header">
        <CloudSun size={28} />
        <div>
          <h3>Weather Forecast</h3>
          <p>{destination}</p>
        </div>
      </div>

      <button onClick={fetchWeather} disabled={loading}>
        {loading ? "Loading..." : "Check Weather"}
      </button>

      {error && <p className="error">{error}</p>}

      {weather && (
        <div className="weather-forecast">
          {weather.daily.time.map((date, index) => {
            const rain =
              weather.daily.precipitation_probability_max[index] || 0;

            return (
              <div className="weather-day" key={date}>
                <h4>{date}</h4>

                {rain >= 40 ? (
                  <CloudRain />
                ) : (
                  <Sun />
                )}

                <p>
                  {weather.daily.temperature_2m_min[index]}°C -
                  {weather.daily.temperature_2m_max[index]}°C
                </p>

                <p>Rain: {rain}%</p>

                <small>
                  {getActivitySuggestion(rain)}
                </small>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default WeatherCard;