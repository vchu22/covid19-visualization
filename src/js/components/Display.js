import React, { Component } from "react";
import DataStore from "../store";
import { fetchHistoricalData } from "../actions";
import DataDisplay from "./Styled/DataDisplay";
import CountryDiv from "./Styled/CountryDiv";
import Card from "./Card";
import Chart from "./Chart";
import CasesMap from "./CasesMap";

// Component
class Display extends Component {
  constructor() {
    super();
    this.state = {
      selectedCountry: DataStore.getSelectedCountry(),
      countriesData: DataStore.getCountriesData(),
    };
  }

  componentDidMount() {
    fetchHistoricalData(this.state.selectedCountry);
    DataStore.on("change", () => {
      this.setState({
        selectedCountry: DataStore.getSelectedCountry(),
        countriesData: DataStore.getCountriesData(),
      });
    });
  }

  render() {
    const selectedCountry = this.state.selectedCountry;
    const countriesData = this.state.countriesData;
    const details = countriesData ? countriesData[selectedCountry] : {};
    const {
      country,
      tests,
      cases,
      todayCases,
      todayDeaths,
      active,
      critical,
      recovered,
      deaths,
      testsPerOneMillion,
      casesPerOneMillion,
      deathsPerOneMillion,
      countryInfo,
    } = details || {};

    return details ? (
      <DataDisplay>
        <CountryDiv>
          <img src={countryInfo.flag} /> {country}{" "}
        </CountryDiv>
        <CasesMap />
        <div>
          <Card title="Tests" number={tests} color="#00cc66"></Card>
          <Card title="Total Cases" number={cases} color="#6699ff"></Card>
          <Card title="New Cases" number={todayCases} color="#ff6600"></Card>
          <Card title="New Deaths" number={todayDeaths} color="#ff5050"></Card>
        </div>
        <div>
          <Card title="Active" number={active} color="#0099ff"></Card>
          <Card title="Critical" number={critical} color="#6600cc"></Card>
          <Card title="Recovery" number={recovered} color="#33cc33"></Card>
          <Card title="Deaths" number={deaths} color="#e60000"></Card>
        </div>
        <div>
          {testsPerOneMillion ? (
            <Card
              title="Tests per Million"
              number={testsPerOneMillion}
              color="#11aa88"
            ></Card>
          ) : null}
          {casesPerOneMillion ? (
            <Card
              title="Cases per Million"
              number={casesPerOneMillion}
              color="#0088ff"
            ></Card>
          ) : null}
          {deathsPerOneMillion ? (
            <Card
              title="Deaths per Million"
              number={deathsPerOneMillion}
              color="#ff0066"
            ></Card>
          ) : null}
        </div>
        <Chart />
      </DataDisplay>
    ) : null;
  }
}

export default Display;
