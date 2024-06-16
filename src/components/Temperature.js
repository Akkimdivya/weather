import React from "react";
import {
  UilTemperature,
  UilTear,
  UilWind,
  UilSun,
  UilSunset,
} from "@iconscout/react-unicons";
import { formatToLocalTime } from "../WeatherAPI";

function TemperatureAndDetails({
  weather: {
    details,
    temp,
    temp_min,
    temp_max,
    sunrise,
    sunset,
    speed,
    humidity,
    feels_like,
    timezone,
  },
}) {
  return (
    <div className="temperature-and-details-container">
      <div className="details-header">
        <p>{details}</p>
      </div>

      <div className="temperature-section">
        <p className="temperature">{`${Math.round(temp)}°`}</p>
        <div className="details-column">
          <div className="detail">
            <UilTemperature size={18} className="detail-icon" />
            <span>Real feel: </span>
            <span className="detail-value">{`${Math.round(feels_like)}°`}</span>
          </div>
          <div className="detail">
            <UilTear size={18} className="detail-icon" />
            <span>Humidity: </span>
            <span className="detail-value">{`${humidity.toFixed()}%`}</span>
          </div>
          <div className="detail">
            <UilWind size={18} className="detail-icon" />
            <span>Wind: </span>
            <span className="detail-value">{`${speed.toFixed()} km/h`}</span>
          </div>
        </div>
      </div>

      <div className="additional-details">
        <div className="detail">
          <UilSun />
          <span>Sunrise: </span>
          <span className="detail-value">{formatToLocalTime(sunrise, timezone, "hh:mm a")}</span>
        </div>
        <div className="detail">
          <UilSunset />
          <span>Sunset: </span>
          <span className="detail-value">{formatToLocalTime(sunset, timezone, "hh:mm a")}</span>
        </div>
        <div className="detail">
          <UilSun />
          <span>Max Temp: </span>
          <span className="detail-value">{`${Math.round(temp_max)}°`}</span>
        </div>
        <div className="detail">
          <UilSun />
          <span>Min Temp: </span>
          <span className="detail-value">{`${Math.round(temp_min)}°`}</span>
        </div>
      </div>
    </div>
  );
}

export default TemperatureAndDetails;
