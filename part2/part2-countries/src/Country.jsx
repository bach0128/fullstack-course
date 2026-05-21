function Country({ country }) {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Capitan: {country.capital[0]}</p>
      <p>Area: {country.area}</p>
      <h2>Language</h2>
      <p>{Object.values(country.languages ?? {}).join(", ")}</p>
      <img src={country.flags.svg} alt={country.flags.alt} loading="lazy" />
      <h2>Weather in {country.name.common}</h2>
      <p>Temperature: {weather.temperature} Celsius</p>
      <p>Wind: {weather.windspeed} m/s</p>
    </div>
  );
}

export default Country;
