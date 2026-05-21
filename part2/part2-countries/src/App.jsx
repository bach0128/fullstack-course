import { useEffect, useState } from "react";
import { useDebounce } from "./helper/useDebounce";
import getCountries from "./api/getContries";
import axios from "axios";
import Country from "./Country";

function App() {
  const [search, setSearch] = useState("");
  const [listCountry, setListCountry] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(undefined);
  const [weather, setWeather] = useState({});
  const searchDebounce = useDebounce(search.trim(), 300);

  const fetchCountries = async () => {
    if (!searchDebounce) {
      setListCountry([]);
      return;
    }

    try {
      const data = await getCountries(searchDebounce);
      setListCountry(data);
    } catch (error) {
      console.error(error);
    }
  };

  const getWeather = async (country) => {
    const [lat, lon] = country.capitalInfo.latlng;

    try {
      const weatherRes = await axios.get(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`,
      );
      setWeather(weatherRes.data.current_weather);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, [searchDebounce]);

  return (
    <div>
      <p>find countries</p>
      <input
        type="text"
        onChange={(e) => setSearch(e.target.value)}
        value={search}
      />
      <div>
        {listCountry &&
          listCountry.map((country, index) => (
            <div key={country.cca3}>
              {country.name.common}
              <button
                onClick={() => {
                  (setSelectedCountry(index), getWeather(country));
                }}
              >
                Show
              </button>
            </div>
          ))}
        {listCountry.length == 1 && selectedCountry !== 0 && (
          <Country country={listCountry[0]} />
        )}
        {listCountry.length > 1 && selectedCountry && selectedCountry !== 0 && (
          <Country country={listCountry[selectedCountry]} />
        )}
      </div>
    </div>
  );
}

export default App;
