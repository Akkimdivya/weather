import React from "react";
import { formatToLocalTime } from "../WeatherAPI";

function TimeAndLocation({ weather: { dt, timezone, name, country } }) {
  return (
    <div className="time-and-location-container">
      <div className="time">
        <p>{formatToLocalTime(dt, timezone)}</p>
      </div>

      <div className="location">
        <p>{`${name}, ${country}`}</p>
      </div>
    </div>
  );
}

export default TimeAndLocation;
