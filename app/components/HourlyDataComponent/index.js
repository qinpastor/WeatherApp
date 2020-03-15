import React, { memo, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Spin, Button } from 'antd';
import PropTypes from 'prop-types';
import {
  StyledDiv,
  StyledLi,
  StyledSpan,
  StyledImg,
  StyledSpan2,
  StyledSpan3,
} from '../DataCard/index';
import Body from '../Background/index';

const HourlyDataComponent = ({ hourlyData }) => {
  const [hData, setHData] = useState({ loading: true, hour: [] });

  useEffect(() => {
    const { id, enteredCity } = hourlyData;
    const url = `http://api.openweathermap.org/data/2.5/forecast?q=${enteredCity},&units=metric&appid=14c25030e41c023940363a0366a7e67f`;
    fetch(url)
      .then(response => response.json())
      .then(responseData => {
        const fetchWeatherData = [];
        responseData.list.map(weatherData => {
          const checkDay = weatherData.dt_txt.split(' ');
          fetchWeatherData.push({
            id: weatherData.dt,
            time: checkDay[1],
            icon: weatherData.weather[0].icon,
            temp_max: weatherData.main.temp_max,
            temp_min: weatherData.main.temp_min,
            main: weatherData.weather[0].main,
            date: checkDay[0],
          });
        });
        const weathers = fetchWeatherData.filter(
          weather => weather.date === id,
        );
        setHData({ loading: false, hour: weathers });
      });
  }, []);

  let load = <Spin />;

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
              <div>
                <StyledSpan2>{tempMin}°</StyledSpan2>
              </div>
              <div>
                <StyledSpan3>{tempMax}°</StyledSpan3>
              </div>
            </StyledLi>
          );
        })}
      </ul>
    );
  }

  const { id } = hourlyData;

  return (
    <Body>
      <StyledDiv>
        <h1>Hourly forecast for {id} </h1>
        {load}
        <br />
        <Link
          to={{
            pathname: '/',
            state: {
              loading: false,
            },
          }}
        >
          <Button type="primary" shape="round">
            Go Back
          </Button>
        </Link>
      </StyledDiv>
    </Body>
  );
};

HourlyDataComponent.propTypes = {
  hourlyData: PropTypes.object,
};
export default memo(HourlyDataComponent);
