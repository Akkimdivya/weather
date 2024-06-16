import React, { useState, useEffect } from "react";
import "./App.css";
import TopButtons from "./components/sampleLocations";
import Inputs from "./components/inputFied";
import TimeAndLocation from "./components/TimeandLocation";
import TemperatureAndDetails from "./components/Temperature";
import getFormattedWeatherData from "./WeatherAPI";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LightDarkToggle from "./components/LightDark";

function App() {
  const [query, setQuery] = useState({ q: "berlin" });
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);
  const [dailyWeather, setDailyWeather] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false); // State for dark mode

  useEffect(() => {
    const fetchWeather = async () => {
      const message = query.q ? query.q : "current location.";

      toast.info("Fetching weather for " + message);

      await getFormattedWeatherData({ ...query, units }).then((data) => {
        toast.success(
          `Successfully fetched weather for ${data.name}, ${data.country}.`
        );

        setWeather(data);
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);

        const formattedDailyWeather = data.daily.map((day) => {
          // Format the title using the same next date
          const formattedTitle = `${tomorrow.getDate()} ${tomorrow.toLocaleDateString(
            "en-US",
            {
              month: "short",
            }
          )} ${tomorrow.getFullYear()} (${day.title.toUpperCase()})`;
          tomorrow.setDate(tomorrow.getDate() + 1);

          return {
            ...day,
            title: formattedTitle,
          };
        });

        console.log(JSON.stringify(formattedDailyWeather));
        setDailyWeather(formattedDailyWeather);
      });
    };

    fetchWeather();
  }, [query, units]);

  // Function to toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div
      className={`mx-auto max-w-screen-md mt-6 py-5 px-32 bg-gradient-to-br  ${
        isDarkMode ? "from-gray-900 to-gray-800 text-white" : "from-blue-200 to-blue-100"
      } h-fit shadow-xl shadow-gray-400`}
    >
        {/* Pass isDarkMode state and toggleDarkMode function to LightDarkToggle */}
        <LightDarkToggle isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />

       <ToastContainer autoClose={5000} theme="colored" newestOnTop={true} />
      <TopButtons setQuery={setQuery} />
      <Inputs setQuery={setQuery} units={units} setUnits={setUnits} />

      {weather && (
        <div>
          <TimeAndLocation weather={weather} />
          <TemperatureAndDetails weather={weather} />
        </div>
      )}

    
     
    </div>
  );
}

export default App;
