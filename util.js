import React from "react";
import numeral from "numeral";
import { Circle, Popup } from "react-leaflet";

const casesTypeColors = {
    cases: {
        hex: "#CC1034",
        multiplier: 800,
    },
    recovered: {
        hex: "#7dd71d",
        multiplier: 1200,
    },
    deaths: {
        hex: "#fb4443",
        multiplier: 2000,
    },
};

export const sortData = (data) => {
    let sortedData = [...data];
    sortedData.sort((a, b) => {
        if (a.cases > b.cases) {
            return -1;
        } else {
            return 1;
        }
    });
    return sortedData;
};

export const prettyPrintStat = (stat) =>
    stat ? `+${numeral(stat).format("0.0a")}` : "+0";

export const showDataOnMap = (data, casesType = "cases") =>
    data.map((country) => (
        < Circle
            center={[country.countryInfo.lat, country.countryInfo.long]}
            color={casesTypeColors[casesType].hex}
            fillColor={casesTypeColors[casesType].hex}
            fillOpacity={0.4}
            radius={
                (Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier) / 5
            }
        >
            <Popup>
                <div className="info-container">
                    <div
                        className="info-flag"
                        style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
                    ></div>
                    <div className="info-name">{country.country}</div>
                    <div className="info-confirmed">
                        <strong>Cases :</strong> {numeral(country.cases).format("0,0")}
                    </div>
                    <div className="info-recovered">
                        <strong> Recovered : </strong>  {numeral(country.recovered).format("0,0")}
                    </div>
                    <div className="info-deaths">
                        <strong>Deaths :</strong>{numeral(country.deaths).format("0,0")}
                    </div>
                </div>
            </Popup>
        </Circle >
    ));
