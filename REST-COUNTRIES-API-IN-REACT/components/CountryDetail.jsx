import React, { useEffect, useState } from "react";

import "./CountryDetail.css";
import { Link, useParams } from "react-router-dom";

export default function CountryDetail() {
  const params = useParams();
  const countryName = params.country;
  const [notFound, setNotFound] = useState(false);
  const [countryData, setCountryData] = useState(null);
 

  useEffect(() => {
    fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
      .then((res) => res.json())
      .then(([data]) => {
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
          currencies: Object.values(data.currencies)
            .map((currency) => currency.name)
            .join(", "),
            borders: []
        });
        
        if(!data.borders){
          data.borders = []
         }
  
          Promise.all( data.borders.map((border)=> {
            return fetch(`https://restcountries.com/v3.1/alpha/${border}`)
            .then((res)=> res.json())
            .then(([borderCountry])=> borderCountry.name.common)
           })).then((borders)=>{
            setCountryData((prevState)=> ({...prevState, borders}))
              console.log("hii");
           })
    
      })
      .catch((err) => {
        console.log(err);
        setNotFound(true);
      });
  }, [countryName]);

  if (notFound) {
    return <div>Country not Found</div>;
  }
  return countryData === null ? (
    "loading..."
  ) : (
    <main>
      <div className="country-detailes-container">
        <span className="back-button" onClick={()=> history.back()}>
          <i className="fa-solid fa-arrow-left" />
          &nbsp; Back
        </span>
        <div className="country-details">
          <img src={countryData.flag} alt={`${countryData.name} flag`} />
          <div className="detail-text-container">
            <h1>{countryData.name}</h1>
            <div className="detail-text">
              <p>
                <b>Native name: </b> {countryData.nativeName}
                <span className="native-name" />
              </p>
              <p>
                <b>Population: </b>{" "}
                {countryData.population.toLocaleString("en-IN")}
                <span className="population" />
              </p>
              <p>
                <b>Region: </b>
                {countryData.region}
                <span className="region" />
              </p>
              <p>
                <b>Sub Region: </b>
                {countryData.subregion}
                <span className="sub-region" />
              </p>
              <p>
                <b>Capital: </b> {countryData.capital.join(", ")}
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
           { countryData.length !== 0 && <div className="border-countries">
              <b>Border Countries: </b>&nbsp;
              {
                countryData.borders.map((border)=> <Link key={border} to={`/${border}`}>{border}</Link>)
              }
            </div>}
          </div>
        </div>
      </div>
    </main>
  );
}
