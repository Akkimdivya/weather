import React from "react";
import { iconUrlFromCode } from "../WeatherAPI";

function Forecast({ title, items }) {
  if (!items) {
    return <p className=" ">No data available</p>;
  }

  return (
    <div className="forecast-container">
      <div className="flex items-center justify-start mt-6">
        <p className="font-medium uppercase">{title}</p>
      </div>
      <hr className="my-2" />

      <div className="forecast-items">
        {items.map((item) => (
          <div key={item.title} className="forecast-item">
            <p className="font-light text-sm">{item.title}</p>
            <img src={iconUrlFromCode(item.icon)} className="w-12 my-1" alt="" />
            <p className="font-medium">{`${Math.round(item.temp)}°`}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Forecast;
