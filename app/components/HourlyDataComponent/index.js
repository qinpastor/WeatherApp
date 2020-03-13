import React, { memo, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { StyledDiv, StyledLi, StyledSpan, StyledImg } from '../DataCard/index';

const HourlyDataComponent = ({ hourlyData }) => {
  const [hData, setHData] = useState({ loading: true, hour: [] });

  useEffect(() => {
    const { id, enteredCity } = hourlyData;
    const url = `http://api.openweathermap.org/data/2.5/forecast?q=${enteredCity},&units=metric&appid=14c25030e41c023940363a0366a7e67f`;
    fetch(url)
      .then(response => response.json())
      .then(responseData => {
        const fetchHourDay = [];
        for (let key in responseData.list) {
          const dateWeather = responseData.list[key].dt_txt.split(' ');
          if (dateWeather[0] === id) {
            fetchHourDay.push({
              id: key,
              time: dateWeather[1],
              date: responseData.list[key].dt_txt,
              icon: responseData.list[key].weather[0].icon,
              temp_max: responseData.list[key].main.temp_max,
              temp_min: responseData.list[key].main.temp_min,
              main: responseData.list[key].weather[0].main,
              date: dateWeather[0],
            });
          }
        }
        setHData({ loading: false, hour: fetchHourDay });
      });
  }, []);

  let load = <h1>Please wait for the Data</h1>;

  if (!hData.loading) {
    load = (
      <ul>
        {hData.hour.map(data => {
          const { id, time, icon, temp_min: tempMin, temp_max: tempMax } = data;
          return (
            <StyledLi key={id}>
              <StyledSpan>{time}</StyledSpan>
              <StyledSpan>
                <StyledImg
                  src={`http://openweathermap.org/img/w/${icon}.png`}
                />
              </StyledSpan>
              <StyledSpan>{tempMin}°</StyledSpan>
              <StyledSpan>{tempMax}°</StyledSpan>
            </StyledLi>
          );
        })}
      </ul>
    );
  }

  const { id } = hourlyData;

  return (
    <StyledDiv>
      <h1>Hourly forecast for {id} </h1>
      {load}
      <Link to="/">Go Back</Link>
    </StyledDiv>
  );
};

export default memo(HourlyDataComponent);
