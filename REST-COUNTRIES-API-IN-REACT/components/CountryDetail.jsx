import React, { useEffect, useState } from "react";

import './CountryDetail.css'

export default function CountryDetail() {
  const countryName = new URLSearchParams(location.search).get("name");
  const [countryData, setCountryData] = useState(null);
  console.log(countryData);

  useEffect(() => {
    fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
      .then((res) => res.json())
      .then(([data]) => {
        console.log(data);
        setCountryData({
          name: data.name.common,
          nativeName: Object.values(data.name.nativeName)[0].common,
          population: data.population,
          region: data.region,
          subregion: data.subregion,
          capital: data.capital,
          flag: data.flags.svg,
          tld: data.tld,
          language: Object.values(data.languages).join(", "),
          currencies: Object.values(data.currencies).map((currency)=> currency.name).join(', '),
        });
      });
  }, []);

  return (
    countryData === null? "loading..." :  ( <main>
      <div className="country-detailes-container">
        <span className="back-button">
          <i className="fa-solid fa-arrow-left" />
          &nbsp; Back
        </span>
        <div className="country-details">
          <img src={countryData.flag} alt= {`${countryData.name} flag`} />
          <div className="detail-text-container">
            <h1>{countryData.name}</h1>
            <div className="detail-text">
              <p>
                <b>Native name: </b> {countryData.nativeName}
                <span className="native-name" />
              </p>
              <p>
                <b>Population: </b> {countryData.population.toLocaleString("en-IN")}
                <span className="population" />
              </p>
              <p>
                <b>Region: </b>{countryData.region}
                <span className="region" />
              </p>
              <p>
                <b>Sub Region: </b>{countryData.subregion}
                <span className="sub-region" />
              </p>
              <p>
                <b>Capital: </b> {countryData.capital.join(', ')}
                <span className="capital" />
              </p>
              <p>
                <b>Top Level Domain:</b> {countryData.tld}
                <span className="top-level-domain" />
              </p>
              <p>
                <b>Currencies:</b> {countryData.currencies}
                <span className="currencies" />
              </p>
              <p>
                <b>Language:</b> {countryData.language}
                <span className="language" />
              </p>
            </div>
            <div className="border-countries">
              <b>Border Countries: </b>&nbsp;
            </div>
          </div>
        </div>
      </div>
    </main>)
  );
}
