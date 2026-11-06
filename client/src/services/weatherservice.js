// Get destination coordinates
export const getCoordinates = async (place) => {
  const response = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(place)}&count=1&language=en&format=json`
  );

  if (!response.ok) {
    throw new Error("Unable to find destination.");
  }

  const data = await response.json();

  if (!data.results || data.results.length === 0) {
    throw new Error("Destination not found.");
  }

  return data.results[0];
};

// Get weather forecast
export const getWeather = async (latitude, longitude) => {
  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weather_code,precipitation_probability_max,temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=7`
  );

  if (!response.ok) {
    throw new Error("Unable to fetch weather.");
  }

  return response.json();
};

// Get weather-based activity suggestion
export const getActivitySuggestion = (rainProbability) => {
  if (rainProbability >= 40) {
    return "Rain expected. Try indoor activities like museums, cafes or art galleries.";
  }

  return "Good weather expected. Enjoy sightseeing, outdoor activities and scenic walks.";
};