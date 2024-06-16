import React, { useState } from "react";
import { UilSearch } from "@iconscout/react-unicons";
import { toast } from "react-toastify";
import getFormattedWeatherData from "../WeatherAPI";

function Inputs({ setQuery, units, setUnits }) {
  const [city, setCity] = useState("");

  const handleUnitsChange = (e) => {
    const selectedUnit = e.currentTarget.name;
    if (units !== selectedUnit) setUnits(selectedUnit);
  };

  const handleSearchClick = async () => {
    if (city.trim() !== "") {
      try {
        const weatherData = await getFormattedWeatherData({ q: city, units });

        if (Object.keys(weatherData).length !== 0) {
          setQuery({ q: city });
        } else {
          alert("City not found. Please enter a valid city name.");
        }
      } catch (error) {
        console.error("Error fetching weather data:", error);
        alert("Error fetching weather data, city name is incorrect");
      }
    } else {
      alert("You have not searched anything ");
    }
  };

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      toast.info("Fetching user's location.");
      navigator.geolocation.getCurrentPosition((position) => {
        toast.success("Location fetched!");
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;

        setQuery({
          lat,
          lon,
        });
      });
    }
  };

  return (
    <div className="inputs-container">
      <div className="search-container">
        <input
          value={city}
          onChange={(e) => setCity(e.currentTarget.value)}
          type="text"
          placeholder="Search for city...."
          className="search-input text-black"
        />
        <UilSearch
          size={25}
          className="search-icon"
          onClick={handleSearchClick}
        />
      </div>

      <div className="units-container">
        <button
          name="metric"
          className="unit-button"
          onClick={handleUnitsChange}
        >
          °C
        </button>
        <p className="unit-separator">|</p>
        <button
          name="imperial"
          className="unit-button"
          onClick={handleUnitsChange}
        >
          °F
        </button>
      </div>
    </div>
  );
}

export default Inputs;
